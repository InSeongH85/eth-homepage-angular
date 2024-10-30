import { Injectable } from '@angular/core';
import { MetamaskWallet } from './metamask.model';
import { from, Observable } from 'rxjs';
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable()
export class MetamaskService {
  constructor() { }
  /**
   * using @web3-onboard/core
   * @param onBoard
   * @returns
   */
  getMetamaskWallets$(onBoard: any): Observable<MetamaskWallet[]> {
    return from(
      onBoard.connectWallet().then((wallets: MetamaskWallet[]) => {
        return wallets;
      }).catch((error: any) => {
        console.error(error);
        return [];
      }) as Promise<MetamaskWallet[]>
    );
  }

  /**
   * using @metamask/detect-provider
   * @returns
   */
  detectEthereumProvider(): Observable<any> {
    return from(
      detectEthereumProvider().then((provider) => {
        if (provider) {
          return provider;
        } else {
          console.error('Please install MetaMask!');
          return false;
        }
      }).catch((error) => {
        console.error(error);
      }) as Promise<any>
    );
  }

  /**
   * using @metamask/sdk
   * @param wallet
   * @returns
   */
  connectWithProvider(wallet: any): Observable<any> {
    return from(
      wallet.provider.request({method: 'eth_requestAccounts'}).then((accounts: string[]) => {
        if (accounts) {
          return accounts;
        } else {
          console.log('No accounts found');
          return [];
        }
      }).catch((error: any) => {
        console.error(error);
        return [];
      }) as Promise<any>
    );
  }
}
