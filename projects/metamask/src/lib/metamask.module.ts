import { NgModule } from '@angular/core';
import { MetamaskIntroComponent } from './metamask-intro.component';
import { MetamaskRoutingModule } from './metamask-routing.module';
import { MetamaskService } from './metamask.service';
import { MetamaskAccountsComponent } from './metamask-accounts.component';

@NgModule({
  declarations: [
    MetamaskIntroComponent,
    MetamaskAccountsComponent,
  ],
  imports: [
    MetamaskRoutingModule,
  ],
  providers: [
    MetamaskService
  ]
})
export class MetamaskModule {

}
