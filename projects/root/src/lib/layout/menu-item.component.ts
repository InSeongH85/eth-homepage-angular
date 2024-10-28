import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Menu } from './menus.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, WindowService } from '../../../../common/src/public-api';
import { LayoutService } from './layout.service';

@Component({
  selector: 'eth-menu-item',
  templateUrl: './menu-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() menus: Menu[] | undefined = [];
  @Output() closed = new EventEmitter();
  @ViewChild('childMenu', { static: true }) childMenu: MatMenu = [] as any;

  baseHref: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private layoutService: LayoutService,
    private commonService: CommonService,
    private windowService: WindowService
  ) {
    this.baseHref = this.windowService.getBaseHref();
  }

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

  emitClosed() {
    this.closed.emit();
  }
}
