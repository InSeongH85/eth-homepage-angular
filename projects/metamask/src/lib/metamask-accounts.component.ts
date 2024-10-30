import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { MetamaskWallet } from './metamask.model';
import { SDKProvider } from '@metamask/sdk';
import { MetamaskService } from './metamask.service';
import { MessageService } from '../../../messages/src/lib/message.service';

@Component({
  selector: 'eth-metamask-accounts',
  templateUrl: './metamask-accounts.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetamaskAccountsComponent {
  @Input() wallets: MetamaskWallet[] = [];
  // @Input() provider: SDKProvider | undefined;
  // accounts: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private metamaskService: MetamaskService,
    private messageService: MessageService
  ) {

    // console.log('Accounts provider', this.provider);
    // console.log('Accounts accounts', this.accounts);
  }

  // @HostListener('window:eip6963:announceProvider', ['$event'])
  // private onEip6963AnnounceProvider(e: any) {
  //   console.log('eip6963:announceProvider', e);
  //   this.metamaskService.connectWithProvider(e.detail).subscribe((accounts: string[]) => {
  //     if (accounts) {
  //       console.log('onEip6963AnnounceProvider accounts', accounts);
  //       this.accounts = accounts;
  //       this.cdr.detectChanges();
  //     }
  //   });
  // }
}
