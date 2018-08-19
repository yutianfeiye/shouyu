import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { LayoutRouting } from './layout.routing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule } from 'ngx-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { NavigationTriggerComponent } from './header/navigation-trigger/navigation-trigger.component';
import { SharedService } from '../shared/services/shared.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {LayoutService} from './layout.service';

import {TranslateModule} from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule ({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavigationTriggerComponent
  ],
  imports: [
    CommonModule,
    LayoutRouting,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    SharedService,
    LayoutService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class LayoutModule {

}
