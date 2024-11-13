import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';
import Onboard, { OnboardAPI } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { MetamaskWallet, ON_BOARD_CHAINS } from './metamask.model';
import { MetamaskService } from './metamask.service';
import { CommonService } from '../../../common/src/public-api';
import { MessageService } from '../../../messages/src/public-api';

@Component({
  selector: 'eth-metamask',
  templateUrl: './metamask-intro.component.html',
  styles: [`
    mat-snack-bar-container {
      background-color: #f44336;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MetamaskIntroComponent {
  onBoard: OnboardAPI;
  wallets: WritableSignal<MetamaskWallet[]> = signal<MetamaskWallet[]>([]);

  constructor(
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private messageService: MessageService,
    private metamaskService: MetamaskService,
  ) {
    const injected = injectedModule();
    this.onBoard = Onboard({
      // This javascript object is unordered meaning props do not require a certain order
      wallets: [injected],
      chains: ON_BOARD_CHAINS
    });
  }

  getMetamaskWallets() {
    this.metamaskService.getMetamaskWallets$(this.onBoard).subscribe((wallets) => {
      this.wallets.set(wallets);
    });
  }
}
