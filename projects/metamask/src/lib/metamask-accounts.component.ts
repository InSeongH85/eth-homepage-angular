import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, Input, InputSignal, OnChanges, OnInit, Signal, signal, SimpleChanges, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MetamaskWallet } from './metamask.model';
import { SDKProvider } from '@metamask/sdk';
import { MetamaskService } from './metamask.service';
import { MessageService } from '../../../messages/src/lib/message.service';
import { ethers } from 'ethers';
import { JsonRpcSigner } from 'ethers';
import { BrowserProvider } from 'ethers';

@Component({
  selector: 'eth-metamask-accounts',
  templateUrl: './metamask-accounts.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetamaskAccountsComponent {
  @Input() wallets: Signal<MetamaskWallet[]> = signal([]);
  provider: SDKProvider | undefined;


  constructor(
    private cdr: ChangeDetectorRef,
    private metamaskService: MetamaskService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.wallets().length > 0) {
      const wallets = this.wallets();
      const ethersBrowserProvider: BrowserProvider = new ethers.BrowserProvider(wallets[0].provider, 'any');
      // this.metamaskService.getBalanceOfAddress$(ethersBrowserProvider, wallets[0].accounts[0].address).subscribe((balance) => {
      //   console.log('Balance', balance);
      // });
    }
  }
}
