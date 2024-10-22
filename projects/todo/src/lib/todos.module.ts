import { NgModule } from '@angular/core';
import { TodosComponent } from './todos.component';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
  declarations: [
    TodosComponent,
  ],
  imports: [
    TodosRoutingModule,
  ],
  exports: [
    TodosComponent,
  ],
})
export class TodosModule {

}
