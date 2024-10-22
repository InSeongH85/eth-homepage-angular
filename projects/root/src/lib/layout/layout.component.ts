import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService, WindowInfo, WindowService } from '../../../../common/src/public-api';

@Component({
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  windowInfo: WindowInfo = new WindowInfo();
  title$: Observable<string> | undefined;
  isScrollUp = false;
  pageOffset: number = 0;
  isHeaderFixed: boolean = true;
  clientHeight: number = 0;
  scrollHeight: number = 0;
  isBottomFixed = false;
  openedCurtainNotice = false;
  fixedHeaderHeight = 0;
  fixedHeaderOffset = this.fixedHeaderHeight;

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
      if (this.pageOffset - this.windowInfo.verticalOffset > 0)
        this.isScrollUp = true;
      else
        this.isScrollUp = false;
      this.pageOffset = this.windowInfo.verticalOffset;
      if (this.pageOffset > this.fixedHeaderOffset)
        this.isHeaderFixed = true;
      else
        this.isHeaderFixed = false;
      if ((this.scrollHeight - this.clientHeight - this.pageOffset) < 150)
        this.isBottomFixed = true;
      else
        this.isBottomFixed = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.windowInfoSubscription.unsubscribe();
  }
}
