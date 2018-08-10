import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SynonymsComponent, SynonymsData} from './synonyms.component';

@Component({
  selector: 'synonyms-dialog',
  templateUrl: 'synonyms.dialog.html',
})
export class SynonymsDialog {
  constructor(
    public dialogRef: MatDialogRef<SynonymsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SynonymsData) {}

    cancel(): void {
      this.dialogRef.close();
    }
}
