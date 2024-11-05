import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/src/public-api';
import CryptoJS from 'crypto-js';
/**
 * CryptoJS를 이용한 암/복호화 서비스
 */
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private aesEncryptKey: string;

  constructor(commonService: CommonService) {
    this.aesEncryptKey = commonService.getConfig('ENCRYPT_KEY');
  }

  /**
   * 설정된 KEY(CRYPTO.AES_ENCRYPT_KEY)로 AES256 암호화
   * @param plainText 평문
   * @returns 암호화된 문자열
   */
  encodeByAES256(key: string, data: string): string {
    const padKey = key.padEnd(32, " ");
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(padKey), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}


  /**
   * AES128로 암호화된 문자열을 복호화
   * @param encryptedText 암호화된 문자열
   * @returns 평문
   */
  decodeByAES256(key: string, data: string): string {
    const padKey = key.padEnd(32, " ");
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(padKey), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  }
}
