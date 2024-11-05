import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertDialog } from './alert.dialog';
import { ChoiceDialog } from './choice.dialog';
import { ConfirmDialog } from './confirm.dialog';
import { SuccessDialog } from './success.dialog';
import { Tab } from '../../../common/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  protected autoFocus = true;

  constructor(protected dialog: MatDialog, protected snackBar: MatSnackBar, protected router: Router) { }

  /**
   * 경고창 실행
   * @param message 메세지
   * @param title 제목
   * @param callbackFn subscribe시 호출할 함수
   * @param autoFocus AutoFocus여부 (api.intercepter에서 사용)
   */
  alert(message: string, title: string, callbackFn?: Function, autoFocus?: boolean) {
    const config = { closeOnNavigation: false, autoFocus: autoFocus !== undefined ? autoFocus : this.autoFocus };
    const dialogRef = this.dialog.open(AlertDialog, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe(_ => {
      if (callbackFn) callbackFn();
    });
  }

  /**
   * 경고창 실행 (Observable)
   * @param message 메세지
   * @param title 제목
   * @param validationErrors 유효성오류
   */
  alert$(message: string, title: string): Observable<void> {
    const config = { closeOnNavigation: false, autoFocus: this.autoFocus };
    const dialogRef = this.dialog.open(AlertDialog, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }

  /**
   * 확인창 실행
   * @param title 제목
   * @param message 메세지
   * @param callbackFn subscribe시 호출할 함수
   */
  confirm(message: string, title: string, callbackFn: Function) {
    const dangerMessages = ['삭제하시겠습니까', '취소하시겠습니까'];
    const config = { closeOnNavigation: false, autoFocus: this.autoFocus };
    const dialogRef = this.dialog.open(ConfirmDialog, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    for (const dangerMessage of dangerMessages) {
      if (message.indexOf(dangerMessage) >= 0) {
        dialogRef.componentInstance.color = 'warn';
        break;
      }
    }
    dialogRef.afterClosed().subscribe(x => callbackFn(x));
  }

  /**
   * 확인창 실행 (Observable)
   * @param title 제목
   * @param message 메세지
   * @param validationErrors 유효성오류
   */
  confirm$(message: string, title: string): Observable<boolean> {
    const dangerMessages = ['삭제하시겠습니까', '취소하시겠습니까'];
    const config = { closeOnNavigation: false, autoFocus: this.autoFocus };
    const dialogRef = this.dialog.open(ConfirmDialog, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    for (const dangerMessage of dangerMessages) {
      if (message.indexOf(dangerMessage) >= 0) {
        dialogRef.componentInstance.color = 'warn';
        break;
      }
    }
    return dialogRef.afterClosed();
  }

  /**
   * 여러개중 하나를 선택하는 Dialog
   * @param title 제목
   * @param message 메세지
   * @param buttons 선택버튼들
   * @param confirmMessages 확인메세지들
   * @returns 선택된 버튼
   */
  choice$(message: string, title: string, buttons: Tab[], confirmMessages?: string[]): Observable<string> {
    const config = { closeOnNavigation: false, autoFocus: this.autoFocus };
    const dialogRef = this.dialog.open(ChoiceDialog, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.buttons = buttons;
    dialogRef.componentInstance.confirmMessages = confirmMessages;
    return dialogRef.afterClosed();
  }

  /**
   * 성공메세지 Dialog - 1초 표시후 자동으로 사라짐
   * @param message 성공메세지
   */
  success(message: string) {
    const dialogRef = this.dialog.open(SuccessDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh'
    });
    dialogRef.componentInstance.message = message;
    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    });
    dialogRef.afterClosed().subscribe(() => window.scrollTo(0, 0));
  }

  /**
   * Toast메세지 - linkTile, linkUrl이 있을 경우 2초 내에 링크를 클릭하면 해당 URL로 이동
   * @param message message
   * @param linkTitle link title
   * @param linkUrl link
   */
  toastMessage(message: string, linkTitle?: string, linkUrl?: string) {
    const option = { duration: 1000 };
    if (linkTitle && linkUrl) {
      this.snackBar.open(message, linkTitle, option).onAction().subscribe(_ => {
        this.router.navigateByUrl(linkUrl);
      });
    } else {
      this.snackBar.open(message, linkTitle, option);
    }
  }
}
