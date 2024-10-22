import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eth-todos',
  template: `
    <ul>
      <li>Todo 1</li>
      <li>Todo 2</li>
      <li>Todo 3</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TodosComponent {
  constructor() {
    console.log('TodosComponent constructor');
  }
}
