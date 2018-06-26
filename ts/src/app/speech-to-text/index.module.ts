import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { RoutingModule } from './routing.module';
import { IndexComponent } from './index.component';
import { SpeechModule } from '../../lib/speech2text/speech.module';

const routes: Routes = [
    { path: '', component: IndexComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        RoutingModule,
        SpeechModule
    ],
    declarations: [IndexComponent],
    providers: []
})
export class IndexModule { }
