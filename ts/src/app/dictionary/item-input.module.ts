import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { RoutingModule } from './item.routing';
import { ItemInputComponent } from './item-input';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { HttpModule } from '@angular/http';

// import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [
    { path: '', component: ItemInputComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        FlexLayoutModule,
        MatCardModule,
        MatTabsModule,
      //  FancyImageUploaderModule,
        MatButtonModule,
        MatDividerModule,
        HttpModule,
        RoutingModule
    ],
    declarations: [ItemInputComponent],
    providers: []
})
export class ItemInputModule { }
