
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
import { AuthModule } from '../lib/auth';
import {TranslateModule} from '@ngx-translate/core';

import { MatFormFieldModule,  MatInputModule, MatCheckboxModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreAudioModule,
    SharedModule,
    AuthModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    PerfectScrollbarModule,
    TranslateModule.forRoot()
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
