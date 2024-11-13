import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { WindowInfo, WindowService } from '../../../../common/src/public-api';
import { Subject, takeUntil } from 'rxjs';
import Onboard, { OnboardAPI } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { MetamaskWallet, ON_BOARD_CHAINS } from '../metamask/metamask.model';
import { MetamaskService } from '../metamask/metamask.service';

@Component({
  selector: 'eth-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') headerEl: ElementRef | undefined;

  @Input() windowInfo = new WindowInfo();
  @Output() moveMenu = new EventEmitter<number>();

  onBoard: OnboardAPI;
  wallets: WritableSignal<MetamaskWallet[]> = signal<MetamaskWallet[]>([]);

  private stop$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private metamaskService: MetamaskService,
    private windowService: WindowService,
  ) {
    const injected = injectedModule();
    this.onBoard = Onboard({
      // This javascript object is unordered meaning props do not require a certain order
      wallets: [injected],
      chains: ON_BOARD_CHAINS
    });
  }

  ngOnInit(): void {
    this.windowService.getWindowInfo$().pipe(takeUntil(this.stop$)).subscribe((info: WindowInfo) => {
      this.windowInfo = info;
      this.cdr.detectChanges();
    });
  }

  getMetamaskWallets() {
    this.metamaskService.getMetamaskWallets$(this.onBoard).subscribe((wallets) => {
      this.wallets.set(wallets);
    });
  }

  moveMenuEvent(index: number) {
    this.moveMenu.emit(index);
  }
}
