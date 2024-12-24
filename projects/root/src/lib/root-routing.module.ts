import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPage } from './intro/intro.page';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: '', component: IntroPage },
      { path: 'metamask', loadChildren: () => import('../../../metamask/src/public-api').then(m => m.MetamaskModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class RootRoutingModule { }
