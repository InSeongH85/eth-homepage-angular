import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, signal, ViewChildren, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Menu } from './menus.model';
import { Router } from '@angular/router';

@Component({
  selector: 'eth-menus',
  templateUrl: './menus.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenusComponent implements OnInit{
  @ViewChildren(MatMenuTrigger) trigger: QueryList<MatMenuTrigger> | undefined;

  enterGnb: boolean | undefined = false;
  activeGnb: number | undefined = 0;
  accessibleMenus: WritableSignal<Menu[]> = signal<Menu[]>([]);

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.accessibleMenus.set([
      {id: 1, name: 'Home', url: '/', isExposed: true, hasChildren: false, sortOrder: 1,
        c8n: [
          {id: 100, name: 'HomeSub', url: '/', isExposed: false, hasChildren: false, sortOrder: 1, c8n: []}
        ]
      },
      {id: 2, name: 'Todo', url: '../todo/todos', isExposed: false, hasChildren: false, sortOrder: 2, c8n: []},
      {id: 3, name: 'Metamask', url: '../metamask/intro', isExposed: true, hasChildren: false, sortOrder: 3, c8n: []},
    ]);
  }

  openMenu(index: number) {
    this.activeGnb = index;
    if (this.trigger) {
      // c8n 이 없거나, c8n 중에 isExposed 가 true 인 것이 없으면 해당 url 로 이동
      if (this.accessibleMenus()[index].c8n.length === 0 || this.accessibleMenus()[index].c8n.filter((item: Menu) => item.isExposed).length === 0) {
        this.router.navigate([this.accessibleMenus()[index].url]);
      }
      this.trigger.toArray().forEach((item: MatMenuTrigger, i: number) => {
        if (i !== index && item.menuOpen) {
          item.closeMenu();
        }
      });
    }
  }
  closedMenu(index: number) {
    if (this.activeGnb === index) this.activeGnb = undefined;
  }
}
