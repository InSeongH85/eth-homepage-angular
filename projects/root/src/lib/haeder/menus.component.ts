import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, QueryList, signal, ViewChildren, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from './menus.model';
import { LayoutService } from '../layout/layout.service';
import { CommonService, WindowService } from '../../../../common/src/public-api';

@Component({
  selector: 'eth-menus',
  templateUrl: './menus.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenusComponent implements OnInit{
  @ViewChildren(MatMenuTrigger) trigger: QueryList<MatMenuTrigger> | undefined;
  @Output() selectedFragment = new EventEmitter<number>();
  readonly frag = signal<number>(1);
  enterGnb: boolean | undefined = false;
  activeGnb: number | undefined = 0;
  accessibleMenus: WritableSignal<Menu[]> = signal<Menu[]>([]);

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private layoutService: LayoutService,
    private windowService: WindowService,
  ) { }


  ngOnInit(): void {
    this.accessibleMenus.set([
      {id: 1, name: 'Home', url: '/', isExposed: true, hasChildren: false, sortOrder: 1, useRoute: false,
        c8n: [
          {id: 100, name: 'HomeSub', url: '/', isExposed: false, hasChildren: false, sortOrder: 1, c8n: []}
        ]
      },
      {id: 2, name: 'About', url: '', isExposed: true, hasChildren: false, sortOrder: 2, useRoute: false, c8n: []},
      {id: 3, name: 'How to buy', url: '', isExposed: true, hasChildren: false, sortOrder: 3, useRoute: false, c8n: []},
      {id: 4, name: 'Tokenomics', url: '', isExposed: true, hasChildren: false, sortOrder: 4, useRoute: false, c8n: []},
      {id: 5, name: 'Roadmap', url: '', isExposed: true, hasChildren: false, sortOrder: 5, useRoute: false, c8n: []},
      {id: 6, name: 'White Paper', url: '', isExposed: true, hasChildren: false, sortOrder: 6, useRoute: false, c8n: []},
    ]);
  }

  openMenu(index: number) {
    this.activeGnb = index;
    if (this.trigger) {
      this.trigger.toArray().forEach((item: MatMenuTrigger, i: number) => {
        if (i !== index && item.menuOpen) {
          item.closeMenu();
        }
        // c8n 이 없거나, c8n 중에 isExposed 가 true 인 것이 없으면 해당 url 로 이동
        if (this.accessibleMenus()[index].c8n.length === 0 || this.accessibleMenus()[index].c8n.filter((item: Menu) => item.isExposed).length === 0) {
          this.router.navigate([this.accessibleMenus()[index].url]);
        }
      });
    }
  }

  /**
   * 페이지 이동
   * @param url
   * @returns
   */
  openPage(url: string): boolean {
    if (url.startsWith('http')) {
      this.windowService.openUrl(url);
    } else {
      const currentUrl = this.layoutService.getUrlStem('/' + this.commonService.getCurrentUrl(this.route));
      if (url !== currentUrl)
        this.router.navigateByUrl(url);
    }
    return false;
  }

  /**
   * Fragment 이동
   * @param fragment
   */
  moveMenu(fragment: number) {
    const frag = fragment + 1;
    const fragName = 'section' + frag;
    const el = document.getElementById(fragName);
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    this.selectedFragment.emit(frag);
  }
}
