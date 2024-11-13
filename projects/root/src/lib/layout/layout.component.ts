import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CommonService, WindowInfo, WindowService } from '../../../../common/src/public-api';

@Component({
  templateUrl: './layout.component.html',
  styles: [
    `
    .bi {
      vertical-align: -.125em;
      fill: currentColor;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  windowInfo: WindowInfo = new WindowInfo();
  title$: Observable<string> | undefined;
  useFrag: boolean = false;
  sectionHeight = 860; // SECTION기본높이
  isScrollUp = false;
  pageOffset: number = 0;
  isHeaderFixed: boolean = true;
  clientHeight: number = 0;
  scrollHeight: number = 0;
  isBottomFixed = false;
  openedCurtainNotice = false;
  fixedHeaderHeight = 0;
  fixedHeaderOffset = this.fixedHeaderHeight;
  scrollButtonBottom = 50;

  private windowInfoSubscription: Subscription = new Subscription();

  constructor(
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private windowService: WindowService) { }

  ngOnInit() {
    this.windowInfoSubscription = this.windowService.getWindowInfo$().subscribe((info: WindowInfo) => {
      this.windowInfo = info;
      this.clientHeight = this.windowInfo.clientHeight;
      this.scrollHeight = this.windowInfo.scrollHeight;
      this.useFrag = (this.windowInfo.isLargeScreen || this.windowInfo.isVeryLargeScreen) ? true : false;
      this.fixedHeaderOffset = this.windowInfo.isMediumScreen ? 115 : this.fixedHeaderHeight;
      if (this.useFrag && this.windowInfo.clientHeight > 860)
        this.sectionHeight = this.windowInfo.clientHeight - this.fixedHeaderHeight;
      this.isScrollUp = this.pageOffset - this.windowInfo.verticalOffset > 0;
      this.pageOffset = this.windowInfo.verticalOffset;
      this.isHeaderFixed = this.pageOffset > this.fixedHeaderOffset;

      if ((this.scrollHeight - this.clientHeight - this.pageOffset) < 150)
        this.isBottomFixed = true;
      else
        this.isBottomFixed = false;

      if (this.windowInfo.clientHeight !== this.windowInfo.scrollHeight && this.windowInfo.clientHeight === this.windowInfo.scrollHeight - this.pageOffset) {
        this.scrollButtonBottom = 150;
      } else {
        this.scrollButtonBottom = 50;
      }
      this.title$ = of(this.commonService.getConfig('SITE_NAME', 'ETH'));
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.windowInfoSubscription.unsubscribe();
  }
}
