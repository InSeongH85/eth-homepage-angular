import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MetamaskWallet } from './metamask.model';
import { SDKProvider } from '@metamask/sdk';
import { MetamaskService } from './metamask.service';
import { MessageService } from '../../../messages/src/lib/message.service';
import { ethers } from 'ethers';
import { JsonRpcSigner } from 'ethers';

@Component({
  selector: 'eth-metamask-accounts',
  templateUrl: './metamask-accounts.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetamaskAccountsComponent implements OnChanges {
  @Input() wallets: MetamaskWallet[] = [];
  // @Input() provider: SDKProvider | undefined;
  // accounts: string[] = [];
  provider: SDKProvider | undefined;


  constructor(
    private cdr: ChangeDetectorRef,
    private metamaskService: MetamaskService,
    private messageService: MessageService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wallets']) {
      if (changes['wallets'].currentValue !== changes['wallets'].previousValue) {
        this.wallets = changes['wallets'].currentValue;
        if (this.wallets.length > 0) {
          console.log(this.wallets[0]);
          const ethersProvider = new ethers.BrowserProvider(this.wallets[0].provider, 'any');
          ethersProvider.getSigner().then((signer: JsonRpcSigner) => {
            console.log(signer);
          });
          // const ethersProvider = ethers.providers.Web3Provider(this.wallets[0].provider, 'any');
        }
        this.cdr.detectChanges();
      }
    }
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
