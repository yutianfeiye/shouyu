import { Component, Input, ViewChild, Injectable , Inject, ElementRef, Renderer2 , ViewChildren,ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener , MatTreeNode} from '@angular/material/tree';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {SynonymsDialog} from './synonyms.dialog';
import {SynonymsService} from './synonyms.service';

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
    public expandable: boolean, public name: string, public level: number, public type: any, public id: string, public parent: string) {}
}

export interface CategoryData {
  id: string;
  name: string;
  lang: string;
}

export interface SynonymsData {
  id: string;
  word: string;
  synonyms: string;
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

  sigml='';

  constructor( private http: Http) {
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
  selector: 'synonyms-comp',
  templateUrl: 'synonyms.html',
  styleUrls: ['synonyms.css'],
  providers: [FileDatabase],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    style: 'flex:1'
  }
})

export class SynonymsComponent {
  form: FormGroup;

  submitted = false;

  errorDiagnostic = '';


  lang = 'zh_cn';

  category='';

  @ViewChild('hansField') hansField: ElementRef;

  config: PerfectScrollbarConfigInterface = {};

  props: any = {
    lang: 'cmn-Hans-CN',
    onChange: (value) => console.log(value + '====') ,
    onEnd: (value) => console.log(value + '#####')
  };


  treeControl: FlatTreeControl<DictionaryFlatNode>;
  treeFlattener: MatTreeFlattener<DictionaryNode, DictionaryFlatNode>;
  dataSource: MatTreeFlatDataSource<DictionaryNode, DictionaryFlatNode>;

  @ViewChildren(MatTreeNode, { read: ElementRef }) treeNodes: ElementRef[];

  hasListener: any[] = [];
  oldHighlight: ElementRef;
  sigml: any;
  wordId='';
  data: any[] = [];

  constructor(private database: FileDatabase ,
     private renderer: Renderer2,
      private _synonymsService: SynonymsService,
      public dialog: MatDialog) {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
      this.treeControl = new FlatTreeControl<DictionaryFlatNode>(this._getLevel, this._isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      database.dataChange.subscribe(data => {
        this.dataSource.data = data;
      });
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

        this.hasListener = this.hasListener.concat([ reference.nativeElement ]);
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

  }

  onSelect(e) {
    this.lang = e.value;
    this.dataSource.data = [];
    this.loadTree (this.lang);
  }

  loadTree(lang) {
    const params = {};
    params['lang'] = lang;
    this.database.getData(params).subscribe(data => {
      if (data.success) {
        this.database.dataChange.next(data.result);
      }
    });
  }

  nodeSelect (e: any ): void {
    if ( e.type === 'category') {
      this.category=e.id;
      this.wordId='';
      this.data=[];
    } else {
      const params={};
      params['id']=e.id;
      this.category=e.parent;
      this.wordId=e.id;
      this.listSynonyms(this.wordId).subscribe(data => {
        this.data=data;
      });
    }
  }

  loadData(){
    this.listSynonyms(this.wordId).subscribe(data => {
      this.data=data;
    });
  }
  openDialog () {
    const dialogRef = this.dialog.open(SynonymsDialog, {
      width: '650px',
      data: {  synonyms: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result['type']='save';
        result['word']= this.wordId;
        this.postSynonyms(result).subscribe(res => {
           if (res.success) {
            this.loadData();
           }
        });
      }
    });
  }

  buttonEnable(){
    return this.wordId==='';
  }

  postSynonyms(params) {
    return this._synonymsService.postSynonyms(params);
  }

  listSynonyms(id) {
    return this._synonymsService.querySynonyms(id);
  }

  editSynonym(id){
    this._synonymsService.getSynonyms(id).subscribe(res => {
      const dialogRef = this.dialog.open(SynonymsDialog, {
        width: '650px',
        data: { id: res['id'],synonyms: res['synonyms']}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.id) {
          result['id']=res['id'];
          result['word']= this.wordId;
          result['type']='update';
          this.postSynonyms(result).subscribe(res => {
            this.loadData();
          });
        }
      });
   });
  }

  deleteSynonym(id){
    this._synonymsService.deleteSynonyms(id).subscribe(res => {
      if (res.success) {
        this.loadData();
      } else {
        console.log(res['message']);
      }
   });
  }
}


