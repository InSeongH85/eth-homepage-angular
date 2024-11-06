import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPage } from './intro/intro.page';
import { LayoutComponent } from './layout/layout.component';
import { AboutPage } from './about/about.page';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: '', component: IntroPage },
      { path: 'about', component: AboutPage },
      { path: 'todo', loadChildren: () => import('../../../todo/src/public-api').then(m => m.TodosModule) },
      { path: 'metamask', loadChildren: () => import('../../../metamask/src/public-api').then(m => m.MetamaskModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
