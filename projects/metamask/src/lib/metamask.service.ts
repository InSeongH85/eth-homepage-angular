import { Injectable } from '@angular/core';
import { MetamaskWallet } from './metamask.model';
import { from, Observable } from 'rxjs';

@Injectable()
export class MetamaskService {
  constructor() { }

  // const wallets = await this.onBoard.connectWallet();
  // console.log(wallets);
  getMetamaskWallets$(onBoard: any): Observable<MetamaskWallet[]> {
    return from(onBoard.connectWallet().then((wallets: MetamaskWallet[]) => {
      console.log(wallets);
        return wallets;
      }).catch((error: any) => {
        console.error(error);
        return [];
      }) as Promise<MetamaskWallet[]>
    );
  }
}
