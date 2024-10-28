import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'eth-root',
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  constructor(
    dateAdapter: DateAdapter<any>,
  ) {
    dateAdapter.setLocale('ko');
  }
}
