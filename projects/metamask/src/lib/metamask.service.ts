import { Injectable } from '@angular/core';
import { MetamaskWallet } from './metamask.model';

@Injectable()
export class MetamaskService {
  constructor() { }

  // const wallets = await this.onBoard.connectWallet();
  // console.log(wallets);
  async getMetamaskWallets$(onBoard: any): Promise<MetamaskWallet[]> {
    return await onBoard.connectWallet().then((wallets: MetamaskWallet[]) => {
        return wallets;
      }).catch((error: any) => {
        console.error(error);
      });
  }
}
