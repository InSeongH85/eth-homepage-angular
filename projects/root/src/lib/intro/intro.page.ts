import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../../messages/src/public-api';

@Component({
  templateUrl: './intro.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IntroPage {
  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  openDialog(dialogType: string) {
    switch (dialogType) {
      case 'alert':
        this.messageService.alert($localize`This is an alert message.`, $localize`Alert`);
        break;
      case 'confirm':
        this.messageService.confirm($localize`Confirm`, $localize`Are you sure?`, (yes: boolean) => {
          if (yes) this.messageService.toastMessage($localize`Confirmed`);
          else this.messageService.toastMessage($localize`Rejected`);
        });
        break;
      case 'toast':
        this.messageService.toastMessage($localize`This is a Toast Message`);
        break;
    }
  }
}
