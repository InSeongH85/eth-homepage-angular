import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EthCommonModule } from '../../../common/src/public-api';
import { AlertDialog } from './alert.dialog';
import { ChoiceDialog } from './choice.dialog';
import { ConfirmDialog } from './confirm.dialog';
import { SuccessDialog } from './success.dialog';

@NgModule({
  declarations: [
    AlertDialog,
    ChoiceDialog,
    ConfirmDialog,
    SuccessDialog,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    EthCommonModule,
  ],
  providers: []
})
export class MessagesModule { }
