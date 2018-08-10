import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserComponent, UserData} from './user.component';

@Component({
  selector: 'user-dialog',
  templateUrl: 'user.dialog.html',
})
export class UserDialog {
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData) {}

    cancel(): void {
      this.dialogRef.close();
    }
}
