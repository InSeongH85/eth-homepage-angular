import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetamaskIntroComponent } from './metamask-intro.component';

const routes: Routes = [
  { path: 'intro', component: MetamaskIntroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetamaskRoutingModule {
}
