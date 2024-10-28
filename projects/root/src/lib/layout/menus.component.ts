import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
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

  activeGnb: number | undefined = 0;
  accessibleMenus: Menu[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.accessibleMenus = [
      {id: 1, name: 'Home', url: '/', isExposed: true, hasChildren: false, sortOrder: 1, c8n: []},
      {id: 2, name: 'Todo', url: '../todo/todos', isExposed: true, hasChildren: false, sortOrder: 2, c8n: []},
      {id: 3, name: 'Metamask', url: '../metamask/intro', isExposed: true, hasChildren: false, sortOrder: 3, c8n: []},
    ];
    this.cdr.detectChanges();
  }

  openMenu(index: number) {
    this.router.navigate([this.accessibleMenus[index].url]);
    // this.activeGnb = index;
    // if (this.trigger) {
    //   this.trigger.toArray().forEach((item: MatMenuTrigger, i: number) => {
    //     if (i !== index && item.menuOpen) {
    //       item.closeMenu();
    //     }
    //   });
    // }
  }
  closedMenu(index: number) {
    if (this.activeGnb === index) this.activeGnb = undefined;
  }
}
