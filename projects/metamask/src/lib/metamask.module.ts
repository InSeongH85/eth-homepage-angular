import { NgModule } from '@angular/core';
import { MetamaskIntroComponent } from './metamask-intro.component';
import { MetamaskRoutingModule } from './metamask-routing.module';
import { MetamaskService } from './metamask.service';

@NgModule({
  declarations: [
    MetamaskIntroComponent
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
