import { NgModule } from '@angular/core';
import { MetamaskIntroComponent } from './metamask-intro.component';
import { MetamaskRoutingModule } from './metamask-routing.module';
import { MetamaskService } from './metamask.service';
import { MetamaskAccountsComponent } from './metamask-accounts.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MetamaskIntroComponent,
    MetamaskAccountsComponent,
  ],
  imports: [
    CommonModule,
    MetamaskRoutingModule,
  ],
  providers: [
    MetamaskService
  ]
})
export class MetamaskModule {

}
