import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WindowService } from '../../../common/src/public-api';

@Component({
  template: `
<h2 md-dialog-title cdkDragHandle cdkDrag cdkDragRootElement=".cdk-overlay-pane">{{title}}</h2>
<div mat-dialog-content class="ikc-MessageDialog ikc-AlertDialog">
  <div [innerHTML]="message | sanitize"></div>
  <!-- <ul *ngIf="validationErrors" class="ikc-infolist ikc-message-list">
    <li *ngFor="let error of validationErrors">
      <span *ngIf="typeOf(error) === 'string'" [textContent]="error"></span>
      <span *ngIf="typeOf(error) !== 'string'"><a (click)="gotoUrl(error.url)" [textContent]="error.message"></a></span>
    </li>
  </ul> -->
</div>
<div md-dialog-actions>
  <!-- <button mat-raised-button [color]="validationErrors ? 'accent' : 'primary'" (click)="dialogRef.close()" i18n>확인</button>
  <span *ngIf="validationErrors" flex></span>
  <button mat-button type="button" *ngIf="validationErrors" (click)="print()" i18n>출력</button>
  <button mat-button type="button" *ngIf="validationErrors" (click)="copy()" i18n>복사</button> -->
</div>`,
  providers: []
})
export class AlertDialog {
  title: string = '';
  message: string = '';

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
