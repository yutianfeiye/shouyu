import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatSelectModule, MatDialogModule, MatFormFieldModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { RoutingModule } from './item.routing';
import { ItemInputComponent } from './item-input';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { HttpModule } from '@angular/http';
import { MatTreeModule } from '@angular/material/tree';
// import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { MatIconModule } from '@angular/material/icon';
import { CategoryDialog } from './category-dialog';


import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};


const routes: Routes = [
  { path: '', component: ItemInputComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatTreeModule,
    //  FancyImageUploaderModule,
    MatButtonModule,
    MatDividerModule,
    HttpModule,
    RoutingModule,
    MatDialogModule,
    PerfectScrollbarModule
  ],
  declarations: [ItemInputComponent, CategoryDialog],
  entryComponents: [
    CategoryDialog
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class ItemInputModule { }
