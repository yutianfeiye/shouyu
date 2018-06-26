import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import JSONFormatter from 'json-formatter-js';

import { RecorderService } from '../../lib/speech2text/core-audio/recorder/recorder.service';


@Component({
  selector: 'text2-speech',
  templateUrl: 'index.component.html'
})
export class IndexComponent {
  form: FormGroup;

  props: any = {
    lang: 'cmn-Hans-CN',
    onChange: (value) => console.log(value + '====') ,
    onEnd: (value) => console.log(value + '#####')
  };

  constructor(
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(): void {
    this.form = this.fb.group({
      'text': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]]
    });
  }

  save(element: HTMLElement) {
    console.log(this.form.value);
  }
}


