import { Component, Input, ViewChild, Injectable, Inject, ElementRef, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, /* RequestOptions,*/ RequestOptionsArgs } from '@angular/http';
import { URLSearchParams } from '@angular/http';
// import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode } from '@angular/material/tree';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CategoryDialog } from './category-dialog';
import { CookieStorage } from '../../lib/cookie';

declare var document: any;

declare var navigator: any;



/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class DictionaryNode {
  id: string;
  expandable: boolean;
  children: DictionaryNode[];
  name: string;
  type: any;
  parent: string;
}

/** Flat node with expandable and level information */
export class DictionaryFlatNode {
  constructor(
    public expandable: boolean, public name: string, public level: number, public type: any, public id: string, public parent: string) { }
}

export interface CategoryData {
  id: string;
  name: string;
  lang: string;
}


/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<DictionaryNode[]>([]);

  get data(): DictionaryNode[] { return this.dataChange.value; }

  treeUrl = '/api/dictionary/getCategory';

  lang = 'zh_cn';

  sigml = '';

  constructor(private http: Http) {
    this.initialize();
  }

  initialize() {

    const params = {};
    params['lang'] = this.lang;

    this.getData(params).subscribe(data => {
      if (data.success) {
        this.dataChange.next(data.result);
        //   this.quickStatData.value = data.result;
      } else {
        // this.errorDiagnostic = data.message;
      }
    },
      error => {

      });
  }

  getData(params) {
    let paramString = '';
    if (params !== undefined) { paramString = this.buildQuery(params); }
    return this.http.get(this.treeUrl + paramString)
      .map((res: Response) => res.json());
  }

  public buildQuery(query: any): string {
    let url = '';
    if (query) {
      url += '?';
      const params: string[] = [];
      // tslint:disable-next-line:forin
      for (const key in query) {
        const value: string | number | boolean = query[key];
        if (value !== undefined) {
          params.push(`${key}=${value}`);
        }
      }
      url += params.join('&');
    }
    return url;
  }
}


@Component({
  selector: 'Hans-input',
  templateUrl: 'item-input.html',
  styleUrls: ['item-input.css'],
  providers: [FileDatabase],
  // encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    style: 'flex:1'
  }
})
export class ItemInputComponent {
  form: FormGroup;

  submitted = false;

  errorDiagnostic = '';


  lang = 'zh_cn';

  category = '';

  @ViewChild('hansField') hansField: ElementRef;

  config: PerfectScrollbarConfigInterface = {};

  submitType = 'save';

  props: any = {
    lang: 'cmn-Hans-CN',
    onChange: (value) => console.log(value + '===='),
    onEnd: (value) => console.log(value + '#####')
  };

  // options: FancyImageUploaderOptions = {
  //   thumbnailHeight: 150,
  //   thumbnailWidth: 250,
  //   uploadUrl: '/api/upload',
  //   allowedImageTypes: ['image/png', 'image/jpeg'],
  //   maxImageSize: 3
  // };

  treeControl: FlatTreeControl<DictionaryFlatNode>;
  treeFlattener: MatTreeFlattener<DictionaryNode, DictionaryFlatNode>;
  dataSource: MatTreeFlatDataSource<DictionaryNode, DictionaryFlatNode>;

  @ViewChildren(MatTreeNode, { read: ElementRef }) treeNodes: ElementRef[];

  hasListener: any[] = [];
  oldHighlight: ElementRef;
  sigml: any;
  wordId: string;

  constructor(private database: FileDatabase,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private http: Http,
    public dialog: MatDialog,
    public translate: TranslateService, ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<DictionaryFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang('en');
    if (CookieStorage.hasCookie('lang')) {
      const lang = CookieStorage.getCookie('lang').value;
      this.translate.use(lang);
    } else {
      const browserLang = translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
    }
  }


  updateHighlight = (newHighlight: ElementRef) => {
    // tslint:disable-next-line:no-unused-expression
    this.oldHighlight && this.renderer.removeClass(this.oldHighlight.nativeElement, 'background-highlight');
    this.renderer.addClass(newHighlight.nativeElement, 'background-highlight');
    this.oldHighlight = newHighlight;
  }

  ngAfterViewChecked() {
    this.treeNodes.forEach((reference) => {
      if (!this.hasListener.includes(reference.nativeElement)) {
        this.renderer.listen(reference.nativeElement, 'click', () => {
          this.updateHighlight(reference);
        });
        this.renderer.listen(reference.nativeElement.children.item(0), 'click', () => {
          this.updateHighlight(reference);
        });

        this.hasListener = this.hasListener.concat([reference.nativeElement]);
      }
    });
    this.hasListener = this.hasListener.filter((element) => document.contains(element));
  }


  transformer = (node: DictionaryNode, level: number) => {
    return new DictionaryFlatNode(node.expandable, node.name, level, node.type, node.id, node.parent);
  }

  private _getLevel = (node: DictionaryFlatNode) => node.level;

  private _isExpandable = (node: DictionaryFlatNode) => node.expandable;

  private _getChildren = (node: DictionaryNode): Observable<DictionaryNode[]> => {
    return observableOf(node.children);
  }

  hasChild = (_: number, _nodeData: DictionaryFlatNode) => _nodeData.expandable;

  ngOnInit(): void {
    this.buildForm();
    CWASA.init();
  }

  onSelect(e) {
    this.lang = e.value;
    this.dataSource.data = [];
    this.loadTree(this.lang);
  }

  loadTree(lang) {
    const params = {};
    params['lang'] = lang;
    this.database.getData(params).subscribe(data => {
      if (data.success) {
        this.database.dataChange.next(data.result);
        //   this.quickStatData.value = data.result;
      } else {
        // this.errorDiagnostic = data.message;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '250px',
      data: { name: '', lang: this.lang }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const params = new URLSearchParams();
        params.append('name', result);
        params.append('lang', this.lang);
        this.postCategory(params).subscribe(data => {
          if (data.success) {
            this.loadTree(this.lang);
          } else {
            this.submitted = false;
            this.errorDiagnostic = data.message;
          }
        });
      }
    });
  }

  nodeSelect(e: any): void {
    if (e.type === 'category') {
      this.category = e.id;
      this.submitType = 'save';
      this.form.reset();
    } else {
      const params = {};
      params['id'] = e.id;
      this.category = e.parent;
      this.getWord(params).subscribe(data => {
        if (data.success) {
          this.sigml = data.result.sigml;
          this.wordId = data.result.id;
          delete data.result.sigml;
          delete data.result.id;
          delete data.result.category;
          delete data.result.lang;
          this.form.setValue(data.result);
          this.submitType = 'update';
          CWASA.playSiGMLText(this.sigml);
        } else {
          console.log(data.message);
        }
      });
    }
  }

  getWord(params) {
    const url = '/api/dictionary/getWord';
    let paramString = '';
    if (params !== undefined) { paramString = this.database.buildQuery(params); }
    return this.http.get(url + paramString).map((res: Response) => res.json());
  }


  // onUpload(file: UploadedFile) {
  //   console.log(file.response);
  // }

  replaceSelection(_field: any, text?): void {
    const e = this.hansField.nativeElement;
    // var text = arguments[0] || '';
    return (
      /* mozilla / dom 3.0 */
      ('selectionStart' in e && function () {
        if (_field.value == null) { _field.value = ''; }
        _field.setValue(_field.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length));
        return this;
      }) ||

      /* exploder */
      (document.selection && function () {
        e.focus();
        document.selection.createRange().text = text;
        return this;
      }) ||
      function () {
        e.setValue(e.value + text);
        return this;
      }
    )();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      'word': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      'pinyin': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      'description': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      // 'image': ['', [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(200)
      // ]],
      'hamnosys': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300)
      ]]
    });
  }

  setGesture(e) {
    const val = e.srcElement.value;

    // this.form.get('hans').setValue('55555');

    this.replaceSelection(this.form.get('hamnosys'), val);
  }

  postCategory(params) {
    const headers = new Headers();
    const postUrl = '/api/dictionary/postCategory';
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(postUrl, params, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
      .map((res: Response) => res.json());
  }

  postWord(params) {
    const headers = new Headers();
    const postUrl = '/api/dictionary/postWord';
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(postUrl, params, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
      .map((res: Response) => res.json());
  }

  onSubmit() {
    if (this.category !== '') {
      this.submitted = true;
      this.errorDiagnostic = null;
      const params = new URLSearchParams();
      params.append('word', this.form.value.word);
      params.append('description', this.form.value.description);
      //  params.append('image', this.form.value.image);
      params.append('hamnosys', this.form.value.hamnosys);
      params.append('pinyin', this.form.value.pinyin);
      params.append('category', this.category);
      params.append('lang', this.lang);
      params.append('type', this.submitType);

      if (this.submitType === 'update') {
        params.append('id', this.wordId);
      }

      this.postWord(params).subscribe(data => {
        if (data.success) {
          this.loadTree(this.lang);
        } else {
          this.submitted = false;
          this.errorDiagnostic = data.message;
        }
      });
    }
  }

  play() {
    CWASA.playSiGMLText(this.sigml);
    //   AvatarGUI.playSiGMLText(this.sigml);  Math.pow(2, this.nSteps / 2);
  }

  save(element: HTMLElement) {
    console.log(this.form.value);
  }
}


