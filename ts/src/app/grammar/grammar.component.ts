import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import {
  TdDataTableSortingOrder, TdDataTableService, TdDataTableComponent,
  ITdDataTableSortChangeEvent, ITdDataTableColumn
} from '../../lib/data-table';

import { IPageChangeEvent, TdPagingBarComponent } from '../../lib/paging';
import { InternalDocsService } from './grammar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {GrammarDialog} from './grammar.dialog';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

export interface GrammarData {
  id: string;
  nl_grammar: string;
  lang: string;
  sl_grammer: string;
}

@Component({
  selector: 'grammar-table',
  styleUrls: ['grammar.component.scss'],
  templateUrl: 'grammar.component.html',
  // animations: [slideInDownAnimation],
 // preserveWhitespaces: true,
})

export class GrammarComponent implements OnInit {


  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('class.td-route-animation') classAnimation = true;

  @ViewChild(TdPagingBarComponent) pagingBar: TdPagingBarComponent;

  columns: ITdDataTableColumn[] = [
    { name: 'lang', label: '语言', hidden: false, width: 100 },
    { name: 'nl_grammar', label: '自然语言语法', sortable: true, width: 450 },
    { name: 'sl_grammer', label: '手语语法', filter: true, sortable: false },
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
  sortBy = 'lang';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService,
    private _internalDocsService: InternalDocsService,
    public dialog: MatDialog
    //  private _dialogService: TdDialogService
  ) { }


  openDialog(): void {
    const dialogRef = this.dialog.open(GrammarDialog, {
      width: '650px',
      data: { lang: '', nl_grammar: '', sl_grammer: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result['type']='save';
        this.postGrammar(result).subscribe(res => {
           if (res.success) {
               this.ngOnInit();
           } else {
          // //  this.submitted = false;
          //   console.log(data.message);
           }
        });
      }
    });
  }

  deleteGrammar(id){
    this._internalDocsService.deleteGrammar(id).subscribe(res => {
       if (res.success) {
           this.ngOnInit();
       } else {
         console.log(res['message']);
       }
    });
  }

  editGrammar(id){
    this._internalDocsService.getGrammar(id).subscribe(res => {
      const dialogRef = this.dialog.open(GrammarDialog, {
        width: '650px',
        data: { id: res['id'],lang: res['lang'], nl_grammar:res['nl_grammar'], sl_grammer: res['sl_grammer']}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.id) {
          result['id']=res['id'];
          result['type']='update';
          this.postGrammar(result).subscribe(res => {
                 this.ngOnInit();
          });
        }
      });
   });
  }

  postGrammar(params) {
    return this._internalDocsService.postGrammar(params);
  }

  async ngOnInit(): Promise<void> {
    this.data = await this._internalDocsService.queryData().toPromise();
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
