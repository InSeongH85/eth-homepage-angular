import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { APP_BASE_HREF, DecimalPipe, PlatformLocation } from '@angular/common';
import { RootComponent } from './root.component';
import { Settings } from 'luxon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ETH_DATE_FORMATS, EthDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from './eth-solars-adapter';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { EthCommonModule } from '../../../common/src/public-api';

Settings.defaultZone = 'Asia/Seoul';


@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    EthCommonModule
  ],
  providers: [
    DecimalPipe,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: DateAdapter, useClass: EthDateAdapter, deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always', appearance: 'outline' } },
    { provide: MAT_DATE_FORMATS, useValue: ETH_DATE_FORMATS },
    { provide: APP_BASE_HREF, useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(), deps: [PlatformLocation] }
  ]
})
export class RootModule {

}
