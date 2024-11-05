import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WindowService } from '../../../common/src/public-api';

@Component({
  template: `
    <h2 md-dialog-title ngClass="dialog-title-{{color}}" cdkDragHandle cdkDrag cdkDragRootElement=".cdk-overlay-pane">{{title}}</h2>
    <div mat-dialog-content class="eth-MessageDialog eth-AlertDialog">
      <div [innerHTML]="message | sanitize"></div>
    </div>
    <div md-dialog-actions>
      <button mat-raised-button [color]="'primary'" (click)="dialogRef.close()" i18n>확인</button>
    </div>
  `,
  providers: []
})
export class AlertDialog {
  title: string = '';
  message: string = '';
  color = 'primary';

  constructor(
    public dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private windowService: WindowService,
  ) {
    dialogRef.disableClose = true;
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.code === 'Escape' || event.code === 'Space') this.dialogRef.close();
    });
  }

  typeOf(value: any) {
    return typeof value;
  }

  gotoUrl(url: string): boolean {
    this.windowService.openUrl(url, '_blank');
    return false;
  }
}
