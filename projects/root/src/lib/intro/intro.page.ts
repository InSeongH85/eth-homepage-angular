import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { WindowInfo, WindowService } from '../../../../common/src/public-api';
import { LOCALE } from './intro.model';

const fragments = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'];

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

  constructor( private cdr: ChangeDetectorRef, private windowService: WindowService ) {
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

  /**
   * WhitePaper 다운로드 클릭시
   * @param lang
   * @param isShort
   */
  downloadWhitePaper(locale: LOCALE, isShort: boolean) {
    let fileName = '';
    const filePathPrefx = '../../../assets/white-paper/';
    switch (locale) {
      case 'en':
        fileName = isShort ? 'WhitePaper-Short-EN.docx' : 'WhitePaper-EN.pptx';
        break;
      case 'ko':
        fileName = isShort ? 'WhitePaper-Short-KR.docx' : 'WhitePaper-KR.pptx';
        break;
      default:
        fileName = isShort ? 'WhitePaper-Short-EN.docx' : 'WhitePaper-EN.pptx';
        break;
    }
    const fileUrl = filePathPrefx.concat(fileName);
    this.downloadFile(fileUrl, fileName);
  }

  /**
   * 실제 다운로드
   * document 에 a 태그를 생성하여 클릭시킴. 그 후 삭제
   * @param url
   * @param fileName
   */
  downloadFile(url: string, fileName: string) {
    const downloadLink = document.createElement('a');
    // downloadLink.href = window.URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));
    downloadLink.href = url;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }
}
