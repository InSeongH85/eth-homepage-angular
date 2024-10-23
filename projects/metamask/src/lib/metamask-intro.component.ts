import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import Onboard, { OnboardAPI } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { MetamaskWallet, ON_BOARD_CHAINS } from './metamask.model';
import { MetamaskService } from './metamask.service';

@Component({
  selector: 'eth-metamask',
  templateUrl: './metamask-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MetamaskIntroComponent implements OnInit {
  onBoard: OnboardAPI;
  wallets: MetamaskWallet[];

  constructor(
    private cdr: ChangeDetectorRef,
    private metamaskService: MetamaskService,
  ) {
    const injected = injectedModule();
    this.onBoard = Onboard({
      // This javascript object is unordered meaning props do not require a certain order
      wallets: [injected],
      chains: ON_BOARD_CHAINS
    });
    this.wallets = [];
  }

  ngOnInit(): void {

  }

  getMetamaskWallets() {
    this.metamaskService.getMetamaskWallets$(this.onBoard).then((wallets) => {
      this.wallets = wallets;
      console.log(this.wallets);
      this.cdr.detectChanges();
    });
  }
}
