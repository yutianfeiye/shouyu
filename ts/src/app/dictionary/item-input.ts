import { Component, Input, ViewChild , ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, /* RequestOptions,*/ RequestOptionsArgs } from '@angular/http';
import { URLSearchParams } from '@angular/http';
// import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

declare var document: any;

@Component({
  selector: 'Hans-input',
  templateUrl: 'item-input.html',
  styleUrls: ['item-input.css']
})
export class ItemInputComponent {
  form: FormGroup;

  submitted = false;

  errorDiagnostic = '';

  postUrl = '/pub/gaokao/yuwen.jcp';

  @ViewChild('hansField') hansField: ElementRef;

  props: any = {
    lang: 'cmn-Hans-CN',
    onChange: (value) => console.log(value + '====') ,
    onEnd: (value) => console.log(value + '#####')
  };

  // options: FancyImageUploaderOptions = {
  //   thumbnailHeight: 150,
  //   thumbnailWidth: 250,
  //   uploadUrl: '/api/upload',
  //   allowedImageTypes: ['image/png', 'image/jpeg'],
  //   maxImageSize: 3
  // };


  constructor( private formBuilder: FormBuilder, private http: Http) { }

  ngOnInit(): void {
    this.buildForm();
  }

  // onUpload(file: UploadedFile) {
  //   console.log(file.response);
  // }

  replaceSelection(_field: any, text ?): void {
    const e = this.hansField.nativeElement;
    // var text = arguments[0] || '';

    return (
      /* mozilla / dom 3.0 */
      ('selectionStart' in e && function() {
   //     e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);

        _field.setValue(_field.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length)) ;
        return this;
      }) ||

      /* exploder */
      (document.selection && function() {
        e.focus();
        document.selection.createRange().text = text;
        return this;
      }) ||
      function() {
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
      'image': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      'hans': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300)
      ]]
    });
  }

  setGesture(e) {
    const val = e.srcElement.value;

    // this.form.get('hans').setValue('55555');

    this.replaceSelection(this.form.get('hans'), val);
  }

  postData(params) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.postUrl, params, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res.json());
  }

  onSubmit() {


    this.submitted = true;
    this.errorDiagnostic = null;

    const params = new URLSearchParams();
    params.append('word', this.form.value.word);
    params.append('description', this.form.value.description);
    params.append('image', this.form.value.image);
    params.append('hans', this.form.value.hans);


    this.postData(params).subscribe(data => {
      if (data.success) {
     //   this.quickStatData.value = data.result;
      } else {
        this.submitted = false;
        this.errorDiagnostic = data.message;
      }
    },
      error => {
        this.submitted = false;
      });
  }

  save(element: HTMLElement) {
    console.log(this.form.value);
  }
}


