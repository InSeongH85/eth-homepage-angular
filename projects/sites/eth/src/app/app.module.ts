import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RootComponent, RootModule } from '../../../../root/src/public-api';

@NgModule({
  imports: [
    RootModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'KRW' },
    { provide: 'env', useValue: environment },
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
