import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
<div mat-dialog-content>
  <div class="ikc-message-success">
    <div class="checkmark">
      <div class="checkmark-circle">
        <div class="background"></div>
        <div class="checkmark draw"></div>
      </div>
    </div>
    <p [innerHTML]="message | sanitize"></p>
  </div>
</div>
`,
  styleUrls: ['./success.dialog.scss']
})
export class SuccessDialog {
  title: string = '';
  message: string = '';

  constructor(public dialogRef: MatDialogRef<SuccessDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }
}
