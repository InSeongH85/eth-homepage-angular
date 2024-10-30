import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tab } from '../../../common/src/public-api';

@Component({
  template: `
    <h2 md-dialog-title ngClass="dialog-title-primary" cdkDragHandle cdkDrag cdkDragRootElement=".cdk-overlay-pane">{{title}}</h2>
    <div mat-dialog-content class="ikc-MessageDialog">
      <div [innerHTML]="message | sanitize"></div>
      <ul *ngIf="confirmMessages" class="ikc-infolist ikc-message-list">
        <li *ngFor="let message of confirmMessages"><span [textContent]="message"></span></li>
      </ul>
    </div>
    <!-- <div md-dialog-actions>
      <button mat-flat-button *ngFor="let button of buttons" color="primary" (click)="dialogRef.close(button.code)">{{button.label}}</button>
      <button mat-button (click)="dialogRef.close(false)" i18n>닫기</button>
      <span *ngIf="confirmMessages" flex></span>
      <button mat-button type="button" *ngIf="confirmMessages" (click)="print()" i18n>출력</button>
      <button mat-button type="button" *ngIf="confirmMessages" (click)="copy()" i18n>복사</button>
    </div> -->
`,
})
export class ChoiceDialog {
  title: string = '';
  message: string = '';
  confirmMessages: string[] | undefined;
  buttons: Tab[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChoiceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.code === 'Escape') this.dialogRef.close(false);
      if (event.code === 'Space') this.dialogRef.close(this.buttons[0].code);
    });
  }

}
