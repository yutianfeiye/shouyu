import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatSelectModule, MatDialogModule, MatFormFieldModule,MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { SynonymsComponent } from './synonyms.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { HttpModule } from '@angular/http';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {SynonymsService} from './synonyms.service';
import {SynonymsDialog} from './synonyms.dialog';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';


import {TranslateModule} from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient} from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};


const routes: Routes = [
  { path: '', component: SynonymsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatTreeModule,
    MatButtonModule,
    MatDividerModule,
    HttpModule,
    MatDialogModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  declarations: [SynonymsComponent,SynonymsDialog],
  entryComponents: [
    SynonymsDialog
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    SynonymsService
  ]
})
export class SynonymsModule { }
