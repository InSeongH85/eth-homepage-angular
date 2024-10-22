import { Injectable } from '@angular/core';

/**
 * JSON 찾기 서비스
 */
@Injectable({
  providedIn: 'root'
})
export class JsonService {
  /**
   * JSON Object내에 점으로 구분된 Key로 값을 찾는다.
   * @param json JSON
   * @param keyPath 점으로 구분된 Key (eg: patron.id)
   * @returns 찾은 값
   */
  public getValueByKeyPath(json: any, keyPath: string): any {
    const keys = keyPath.split('.');
    let value = json;

    for (const key of keys) {
      if (value && value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        return undefined; // Key not found
      }
    }
    return value;
  }
}
