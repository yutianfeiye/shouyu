
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeechComponent } from './speech.component';

@NgModule({
  declarations: [
    SpeechComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SpeechComponent
  ],

  bootstrap: [SpeechComponent]
})
export class SpeechModule { }
