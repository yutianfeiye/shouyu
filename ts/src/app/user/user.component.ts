import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import {
  TdDataTableSortingOrder, TdDataTableService, TdDataTableComponent,
  ITdDataTableSortChangeEvent, ITdDataTableColumn
} from '../../lib/data-table';

import { IPageChangeEvent, TdPagingBarComponent } from '../../lib/paging';
import { UserService } from './user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserDialog} from './user.dialog';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

export interface UserData {
  user_id: string;
  user_name: string;
  real_name: string;
  password: string;
}

@Component({
  selector: 'user-table',
  styleUrls: ['user.component.scss'],
  templateUrl: 'user.component.html',
  // animations: [slideInDownAnimation],
 // preserveWhitespaces: true,
})

export class UserComponent implements OnInit {


  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('class.td-route-animation') classAnimation = true;

  @ViewChild(TdPagingBarComponent) pagingBar: TdPagingBarComponent;

  columns: ITdDataTableColumn[] = [
    { name: 'user_name', label: '用户名', sortable: true, width: 450 },
    { name: 'real_name', label: '姓名', filter: true, sortable: false },
    { name: 'password', label: '密码', filter: false, width: 350 },
    { name: 'id', label: '操作', width: 100 }
  ];

  data: any[];
  basicData: any[];
  selectable = false;
  clickable = false;
  multiple = true;
  filterColumn = true;

  filteredData: any[];
  filteredTotal: number;
  selectedRows: any[] = [];

  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 50;
  sortBy = 'user_name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService,
    private _internalDocsService: UserService,
    public dialog: MatDialog
    //  private _dialogService: TdDialogService
  ) { }


  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '650px',
      data: { user_name: '', real_name: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result['type']='save';
        this.postUser(result).subscribe(res => {
           if (res.success) {
               this.ngOnInit();
           }
        });
      }
    });
  }

  deleteUser(id){
    this._internalDocsService.deleteUser(id).subscribe(res => {
       if (res.success) {
           this.ngOnInit();
       } else {
         console.log(res['message']);
       }
    });
  }

  editUser(id){
    this._internalDocsService.getUser(id).subscribe(res => {
      const dialogRef = this.dialog.open(UserDialog, {
        width: '650px',
        data: { id: res['id'],user_name: res['user_name'], real_name:res['real_name'], password: res['password']}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.id) {
          result['id']=res['id'];
          result['type']='update';
          this.postUser(result).subscribe(res => {
                 this.ngOnInit();
          });
        }
      });
   });
  }

  postUser(params) {
    return this._internalDocsService.postUser(params);
  }

  async ngOnInit(): Promise<void> {
    this.data = await this._internalDocsService.queryUsers().toPromise();
    this.basicData = this.data.slice(0, 10);
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }


  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  async filter(): Promise<void> {
    let newData: any[] = this.data;
    const excludedColumns: string[] = await this.columns
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = await this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = await this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = await this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  showAlert(event: any): void {
    // this._dialogService.openAlert({
    //   message: 'You clicked on row: ' + event.row.first_name + ' ' + event.row.last_name,
    // });
  }
}
