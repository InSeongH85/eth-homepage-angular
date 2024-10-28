import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  /**
   * 부모Route로 현재 URL에 대응하는 ActivatedRoute를 돌려준다.
   * @param route 현재|부모 Route
   * @returns 현재 URL의 ActivatedRoute
   */
  getCurrentRoute(route: ActivatedRoute): ActivatedRoute {
    if (route.firstChild)
      return this.getCurrentRoute(route.firstChild);
    return route;
  }

  /**
   * route로 현재 URL을 리턴한다.
   * @param route ActivatedRoute
   * @param useThisRoute params.route를 그대로 사용할 지 여부 (기본값 false)
   * @returns 현재 URL
   */
  getCurrentUrl(route: ActivatedRoute, useThisRoute = false): string {
    const currentRoute = useThisRoute ? route : this.getCurrentRoute(route);
    return currentRoute.snapshot.pathFromRoot.filter(v => v.url.length > 0).map(o => o.url.join('/')).join('/');
  }

}
