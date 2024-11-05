import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h2 md-dialog-title ngClass="dialog-title-{{color}}" cdkDragHandle cdkDrag cdkDragRootElement=".cdk-overlay-pane">{{title}}</h2>
    <div mat-dialog-content class="eth-MessageDialog">
      <div [innerHTML]="message | sanitize"></div>
    </div>
    <div md-dialog-actions>
      <button mat-flat-button [color]="color" (click)="dialogRef.close(true)" i18n>예</button>
      <button mat-flat-button (click)="dialogRef.close(false)" i18n>아니오</button>
    </div>
  `,
})
export class ConfirmDialog {
  title: string = '';
  message: string = '';
  validationErrors: string[] | undefined;
  color = 'primary';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.code === 'Escape') this.dialogRef.close(false);
      if (event.code === 'Space') this.dialogRef.close(true);
    });
  }
}
