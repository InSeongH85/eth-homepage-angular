import * as CryptoJS from 'crypto-js';

export class SHA256 {
  static getHashcode(obj: any): string {
    return CryptoJS.SHA256(JSON.stringify(obj).replace(/null/g, '""')).toString(CryptoJS.enc.Hex);
  }
}
