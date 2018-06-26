

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module';
import { CoreAudioModule } from '../lib/speech2text/core-audio';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreAudioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

