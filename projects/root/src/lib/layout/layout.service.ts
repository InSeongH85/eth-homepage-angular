import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Menu } from './menus.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  currentMenuTitle$ = new BehaviorSubject<string>('');
  private readonly pageTitle: string;

  constructor(private titleService: Title) {
    this.pageTitle = 'ETH';
  }
  /**
   * Url에서 params, queryParams을 제거한 뿌리부분 URL을 리턴
   * @param url URL string
   */
  getUrlStem(url: string): string {
    if (!url) return url;
    const offset = url.indexOf('?');
    if (offset > 0) url = url.substring(0, offset);
    const arr = url.split('/');
    const lastUrl = arr[arr.length - 1];
    if (lastUrl.match(/^[0-9]*$/) || lastUrl.match(/((\w{4,12}-?)){5}/) || lastUrl.match(/((\d{1,12}-?)){2}/)) arr.splice(arr.length - 1, 1);
    return arr.join('/');
  }

  /**
   * 현재 URL로 Breadcrumb에 표시할 메뉴를 만들어 리턴한다.
   * 그리고 현재 메뉴명을 지정하여 Page에서 사용하도록 Set한다.
   * @param currentUrl CurrentURL
   * @param accessibleMenus 접근가능메뉴들
   * @returns Breadcrumb에 표시할 메뉴 (eg: 정리 > 서지 > 서지관리)
   */
  getCurrentMenus(currentUrl: string, accessibleMenus: Menu[]): Menu[] {
    currentUrl = this.getUrlStem(currentUrl);
    const currentMenus: Menu[] = [];
    if (!currentUrl) return currentMenus;
    for (let i = 0; i < accessibleMenus.length; i++) {
      const menu = accessibleMenus[i];
      if (menu.c8n) {
        if (this.findCurrentMenu(currentUrl, currentMenus, menu.c8n)) {
          currentMenus.unshift(menu);
          break;
        }
      }
    }
    const currentMenu = currentMenus[currentMenus.length - 1];
    if (currentMenu) {
      const currTitle = this.titleService.getTitle();
      const newTitle = currentMenu.name + ' : ' + this.pageTitle;
      if (currTitle !== newTitle)
        this.titleService.setTitle(newTitle);
    }

    return currentMenus;
  }

  private findCurrentMenu(currentUrl: string, currentMenus: Menu[], menus: Menu[]): boolean {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];

      if (menu.c8n && menu.c8n.length > 0) {
        if (this.findCurrentMenu(currentUrl, currentMenus, menu.c8n)) {
          currentMenus.unshift(menu);
          return true;
        }
      } else if (menu.url && menu.url.length > 1 && menu.isExposed && currentUrl == menu.url) {
        currentMenus.unshift(menu);
        this.currentMenuTitle$.next(menu.name);
        return true;
      }
    }
    return false;
  }

}
