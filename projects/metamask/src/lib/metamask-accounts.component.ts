import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MetamaskWallet } from './metamask.model';

@Component({
  selector: 'eth-metamask-accounts',
  templateUrl: './metamask-accounts.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetamaskAccountsComponent {
  @Input() wallets: MetamaskWallet[] = [];

  constructor() { }
}
