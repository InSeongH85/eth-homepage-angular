import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h2 md-dialog-title ngClass="dialog-title-{{color}}" cdkDragHandle cdkDrag cdkDragRootElement=".cdk-overlay-pane">{{title}}</h2>
    <div mat-dialog-content class="ikc-MessageDialog">
      <div [innerHTML]="message | sanitize"></div>
      <ul *ngIf="validationErrors" class="ikc-infolist ikc-message-list">
        <li *ngFor="let error of validationErrors"><span [textContent]="error"></span></li>
      </ul>
    </div>
    <!-- <div md-dialog-actions>
      <button mat-flat-button [color]="color" (click)="dialogRef.close(true)" i18n>예</button>
      <button mat-flat-button (click)="dialogRef.close(false)" i18n>아니오</button>
      <span *ngIf="validationErrors" flex></span>
      <button mat-button type="button" *ngIf="validationErrors" (click)="print()" i18n>출력</button>
      <button mat-button type="button" *ngIf="validationErrors" (click)="copy()" i18n>복사</button>
    </div> -->
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
