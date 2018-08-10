import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule ,MatInputModule,MatMenuModule} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { GrammarComponent } from './grammar.component';
import { PagingModule } from '../../lib/paging';
import { DataTableModule } from '../../lib/data-table';
import { InternalDocsService } from './grammar.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {GrammarDialog} from './grammar.dialog';

const HOME_ROUTE = [
    { path: '', component: GrammarComponent }
];

@NgModule({
    declarations: [
        GrammarComponent,GrammarDialog
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        DataTableModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        PagingModule,
        RouterModule.forChild(HOME_ROUTE)
    ],
    entryComponents: [
        GrammarDialog
    ],
    providers: [
        InternalDocsService,
        HttpClient
    ],
})

export class GrammarModule { }
