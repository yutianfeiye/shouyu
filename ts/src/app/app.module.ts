
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';
import { CoreAudioModule } from '../lib/speech2text/core-audio';
import { AppComponent } from './app.component';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

import { LoginComponent } from './login/login.component';
import {SharedModule} from './shared/shared.module';
import { AuthenticatedGuard } from './login/authenticated.guard';
import { LoginService } from './login/login.service';
import { LoginDialog } from './login/login.dialog';
import { SetupDialog } from './login/setup.dialog';
import { AuthModule } from '../lib/auth';
import {SpeechModule} from '../lib/speech2text/speech.module';

import {TranslateModule} from '@ngx-translate/core';
import { MatFormFieldModule, MatSelectModule, MatButtonModule,MatInputModule, MatCheckboxModule
  ,MatDialogModule,MatMenuModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import 'hammerjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginDialog,
    SetupDialog
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreAudioModule,
    SharedModule,
    AuthModule,
    SpeechModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    PerfectScrollbarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    LoginDialog,
    SetupDialog
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LoginService,
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
