import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private env: any;

  constructor(@Inject('env') env: any) {
    this.env = env;
  }

  /**
   * environment 설정값을 읽어온다.
   * @param key 키 (ex: API_URL)
   * @param defaultValue 기본값
   */
  getConfig(key: string, defaultValue?: any) {
    let value = _.cloneDeep(this.env);
    for (const k of key.split('.')) {
      if (value[k] === undefined) return defaultValue;
      value = value[k];
    }
    return value !== undefined ? value : defaultValue;
  }
}
