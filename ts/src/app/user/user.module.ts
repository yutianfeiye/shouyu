import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule ,MatInputModule,MatMenuModule} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './user.component';
import { PagingModule } from '../../lib/paging';
import { DataTableModule } from '../../lib/data-table';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {UserDialog} from './user.dialog';
import {TranslateModule} from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const HOME_ROUTE = [
    { path: '', component: UserComponent }
];

@NgModule({
    declarations: [
        UserComponent,UserDialog
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
        RouterModule.forChild(HOME_ROUTE),
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
        })
    ],
    entryComponents: [
        UserDialog
    ],
    providers: [
        UserService,
        HttpClient
    ],
})

export class UserModule { }
