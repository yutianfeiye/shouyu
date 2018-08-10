import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {GrammarComponent, GrammarData} from './grammar.component';

@Component({
  selector: 'grammar-dialog',
  templateUrl: 'grammar.dialog.html',
})
export class GrammarDialog {
  constructor(
    public dialogRef: MatDialogRef<GrammarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GrammarData) {}

    cancel(): void {
      this.dialogRef.close();
    }
}
