import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ItemInputComponent, CategoryData} from './item-input';

@Component({
  selector: 'category-dialog',
  templateUrl: 'category-dialog.html',
})
export class CategoryDialog {
  constructor(
    public dialogRef: MatDialogRef<ItemInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryData) {}

    cancel(): void {
      this.dialogRef.close();
    }
}
