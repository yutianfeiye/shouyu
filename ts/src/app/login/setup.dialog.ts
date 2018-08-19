import { Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent, SetupData} from './login.component';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'setup-dialog',
  templateUrl: 'setup.dialog.html',
})
export class SetupDialog {

  showTicks = false;

  autoTicks = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetupData) {}

    cancel(): void {
      this.dialogRef.close();
    }

    get tickInterval(): number | 'auto' {
      return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
    }
    set tickInterval(value) {
      this._tickInterval = coerceNumberProperty(value);
    }
    private _tickInterval = 0.5;
}
