import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home.component';
import { SpeechModule } from '../../lib/speech2text/speech.module';

const routes: Routes = [
    { path: '', component: HomeComponent }
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
    declarations: [HomeComponent],
    providers: []
})
export class HomeModule { }
