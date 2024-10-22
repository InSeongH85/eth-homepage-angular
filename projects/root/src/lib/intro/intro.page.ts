import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './intro.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IntroPage {
  constructor(
    private router: Router
  ) {
    console.log('IntroPage constructor');
  }

  linkTodos() {
    this.router.navigate(['todo/todos']);
  }
}
