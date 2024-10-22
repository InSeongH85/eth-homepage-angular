import { BreakpointObserver } from '@angular/cdk/layout';
import { APP_BASE_HREF, ViewportScroller } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Event, Router, Scroll } from '@angular/router';
import * as _ from 'lodash';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CommonService } from './common.service';
import { WindowInfo } from './common.model';

/**
 * SOLARS 윈도우관련(기기정보, 화면폭, 스크롤Offset등) 제공 서비스
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService implements OnDestroy {
  private windowInfo: WindowInfo = new WindowInfo();
  private windowInfo$: BehaviorSubject<WindowInfo>;
  private _maximized$: BehaviorSubject<boolean>;
  private position: [number, number] = [0, 0];
  private anchor: string = '';
  private routerSubscription: Subscription;

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    breakpointObserver: BreakpointObserver,
    deviceService: DeviceDetectorService,
    router: Router,
    private viewportScroller: ViewportScroller,
    private commonService: CommonService
  ) {
    this.baseHref = this.baseHref.replace(/\/$/, '');
    const phoneMaxWidth = Number(this.commonService.getConfig('WINDOW.PHONE_MAX_WIDTH', 767));
    const tabletMaxWidth = Number(this.commonService.getConfig('WINDOW.TABLET_MAX_WIDTH', 1024));
    const laptopMaxWidth = Number(this.commonService.getConfig('WINDOW.LAPTOP_MAX_WIDTH', 1680));
    const isSmallScreen = `(max-width: ${phoneMaxWidth}px)`;
    const isMediumScreen = `(min-width: ${phoneMaxWidth + 1}px) and (max-width: ${tabletMaxWidth}px)`;
    const isLargeScreen = `(min-width: ${tabletMaxWidth + 1}px) and (max-width: ${laptopMaxWidth}px)`;
    const isVeryLargeScreen = `(min-width: ${laptopMaxWidth + 1}px)`;

    this.windowInfo.isMobile = deviceService.isMobile();
    this.windowInfo.isTablet = deviceService.isTablet();
    this.windowInfo.verticalOffset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.windowInfo.clientWidth = document.documentElement.clientWidth;
    this.windowInfo.clientHeight = document.documentElement.clientHeight;
    this.windowInfo.scrollHeight = document.documentElement.scrollHeight;
    // .NET 으로 작성된 SolarsBrowser 일 시 window['chrome'].webview.hostObjects.class.MessageShowJson("Js send text"); 이와같이 호출
    // window['chrome'] 은 Chromium 계열의 Browser 에 존재한다. Edge, Chrome... Safari, Firefox 에서는 존재하지 않는다.
    this.windowInfo$ = new BehaviorSubject<WindowInfo>(this.windowInfo);

    breakpointObserver.observe([isSmallScreen, isMediumScreen, isLargeScreen, isVeryLargeScreen]).subscribe(result => {
      this.windowInfo.isSmallScreen = result.breakpoints[isSmallScreen];
      this.windowInfo.isMediumScreen = result.breakpoints[isMediumScreen];
      this.windowInfo.isLargeScreen = result.breakpoints[isLargeScreen];
      this.windowInfo.isVeryLargeScreen = result.breakpoints[isVeryLargeScreen];
      this.windowInfo$.next(this.windowInfo);
    });

    window.addEventListener('scroll', (event) => this.onScroll(event), { passive: true });
    window.addEventListener('resize', _.throttle((event: any) => this.onResize(event), 500), { passive: true });
    window.addEventListener('touchmove', (event) => this.onScroll(event), { passive: true });

    /**
     * navigation back or forward 시 이전 position을 복구한다.
     */
    this.routerSubscription = router.events.pipe(filter((e: Event): e is Scroll => e instanceof Scroll)).subscribe(e => {
      this.position = [0, 0];
      this.anchor = '';
      if (e.position)
        this.position = e.position;
      else if (e.anchor)
        this.anchor = e.anchor;
      this._scrollToLastPosition();
    });

    this._maximized$ = new BehaviorSubject(false);
  }

  private onScroll(event: any) {
    this.windowInfo.verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.windowInfo.scrollHeight = document.documentElement.scrollHeight;
    this.windowInfo$.next(this.windowInfo);
  }

  private onResize(event: any) {
    if (this.windowInfo.clientWidth !== document.documentElement.clientWidth ||
      this.windowInfo.clientHeight !== document.documentElement.clientHeight ||
      this.windowInfo.scrollHeight !== document.documentElement.scrollHeight
    ) {
      this.windowInfo.clientWidth = document.documentElement.clientWidth;
      this.windowInfo.clientHeight = document.documentElement.clientHeight;
      this.windowInfo.scrollHeight = document.documentElement.scrollHeight;
      this.windowInfo$.next(this.windowInfo);
    }
  }

  /**
   * ngDestroy()에서 획득한 Observable<WindowInfo>의 subscription을 unsubscribe해야 한다.
   * @returns windowInfo Observable
   */
  getWindowInfo$(): Observable<WindowInfo> {
    return this.windowInfo$.asObservable();
  }

  /**
   * navigation back or forward시에 이전 Position을 복구시킨다.
   * @param isFirstCalled true: 기본값, false: API호출이 끝나고 호출할 때
   */
  private _scrollToLastPosition(isFirstCalled = true) {
    setTimeout((_: any) => {
      if (this.position) {
        this.viewportScroller.scrollToPosition(this.position);
        if (!isFirstCalled) this.position = [0, 0];
      } else if (this.anchor) {
        this.viewportScroller.scrollToAnchor(this.anchor);
        if (!isFirstCalled) this.anchor = '';
      } else {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    }, 100);
  }

  /**
   * navigation back or forward시에 이전 Position을 복구시킨다.
   * api 호출이 끝나는 시점에 호출
   */
  scrollToLastPosition(): MonoTypeOperatorFunction<any> {
    return tap({
      complete: () => this._scrollToLastPosition(false)
    });
  }

  /**
   * @returns navigation back or forward로 이동된 상태인지 여부
   */
  isNavigatedBack(): boolean {
    if (this.position || this.anchor)
      return true;
    return false;
  }

  isVisible(elem: HTMLElement): boolean {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = window.getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < '0.1') return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height + elem.getBoundingClientRect().width === 0)
      return false;
    const elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
      if (pointContainer === elem) return true;
      pointContainer = pointContainer?.parentNode as Element;
    } while (pointContainer);
    return false;
  }

  /**
   * ngDestroy()에서 획득한 Observable<boolean>의 subscription을 unsubscribe해야 한다.
   * @returns Observable<boolean>
   */
  maximized$(): Observable<boolean> {
    return this._maximized$.asObservable();
  }

  /**
   * 최대화 토글
   * @param maximized 최대화여부
   */
  setMaximized(maximized: boolean) {
    this._maximized$.next(maximized);
  }

  /**
   * BaseHref리턴
   * @returns BaseHref
   */
  getBaseHref(): string {
    return this.baseHref;
  }

  /**
   * 새창으로 URL 오픈
   * 내부 페이지 오픈시에는 base href를 포함한다.
   * @param url URL
   * @param target Target
   */
  openUrl(url: string, target?: string) {
    this.normalOpenUrl(url, target);
  }

  /**
   * 기본 브라우저 일 시 신규Tab으로 URL 오픈
   * @param url
   * @param target
   */
  private normalOpenUrl(url: string, target?: string) {
    if (url.startsWith('http')) {
      window.open(url, target);
    } else {
      window.open(this.baseHref + url, target);
    }
  }

  /**
   * Random값을 Crypto로 생성
   * Math.random() 보다 안전한 Crypto Random값 생성
   * @returns number
   */
  getCryptoRandomValue(): number {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / Math.pow(2, 36);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
