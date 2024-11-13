import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../../messages/src/public-api';
import { WindowInfo, WindowService } from '../../../../common/src/public-api';

const fragments = ['section1', 'section2', 'section3'];

@Component({
  templateUrl: './intro.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IntroPage implements OnInit {
  // @ViewChild('top', { read: ElementRef }) topEl: ElementRef;
  windowInfo: WindowInfo = new WindowInfo();
  sectionHeight = 860; // SECTION기본높이
  frag: WritableSignal<number> = signal(1);
  useFrag: boolean = false;
  isHeaderFixed = false;
  fixedHeaderHeight = 140;
  fixedHeaderOffset = this.fixedHeaderHeight;
  pageOffset: number = 0;
  scrollButtonBottom = 50;

  // private windowInfoSubscription: Subscription;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private windowService: WindowService,
  ) {
    // 스크롤이벤트발생시, 화면에 보이는 fragment section 찾기
    window.addEventListener('scroll', () => this.checkIfFragmentsVisible());
  }

  ngOnInit(): void {
    this.windowService.getWindowInfo$().subscribe((info: WindowInfo) => {
      this.windowInfo = info;
      this.useFrag = (this.windowInfo.isLargeScreen || this.windowInfo.isVeryLargeScreen) ? true : false;
      this.fixedHeaderOffset = this.windowInfo.isMediumScreen ? 115 : this.fixedHeaderHeight;
      if (this.useFrag && this.windowInfo.clientHeight > 860)
        this.sectionHeight = this.windowInfo.clientHeight - this.fixedHeaderHeight;

      this.pageOffset = this.windowInfo.verticalOffset;
      this.isHeaderFixed = this.pageOffset > this.fixedHeaderOffset ? true : false;

      if (this.windowInfo.clientHeight !== this.windowInfo.scrollHeight && this.windowInfo.clientHeight === this.windowInfo.scrollHeight - this.pageOffset) {
        this.scrollButtonBottom = 150;
      } else {
        this.scrollButtonBottom = 50;
      }

      this.cdr.detectChanges();
    });
  }

  /**
   * 화면에 보이는 section 찾기
   */
  private checkIfFragmentsVisible() {
    setTimeout(() => {
      fragments.forEach((fragment: string) => {
        const el = document.getElementById(fragment);
        if (el && this.windowService.isVisible(el)) {
          this.frag.set(Number(fragment.substring(7, 8)));
        }
      });
    }, 300);
  }

  /**
   * Jump to Fragment
   */
  jumpToFragment(fragment: number) {
    const index = fragments.findIndex((frag: string) => { return Number(frag.substring(7, 8)) === fragment});
    const el = document.getElementById(index > -1 ? fragments[index] : 'section1');
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    return false;
  }
}
