import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { APP_BASE_HREF, DecimalPipe, PlatformLocation } from '@angular/common';
import { RootComponent } from './root.component';
import { Settings } from 'luxon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ETH_DATE_FORMATS, EthDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from './eth-date-adapter';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { EthCommonModule } from '../../../common/src/public-api';
import { RootRoutingModule } from './root-routing.module';
import { IntroPage } from './intro/intro.page';
import { LayoutComponent } from './layout/layout.component';
import { MetamaskModule } from '../../../metamask/src/public-api';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './haeder/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutService } from './layout/layout.service';
import { MessagesModule } from '../../../messages/src/lib/messages.module';
import { MenusComponent } from './haeder/menus.component';

Settings.defaultZone = 'Asia/Seoul';

@NgModule({
  declarations: [
    IntroPage,
    LayoutComponent,
    HeaderComponent,
    MenusComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    RootRoutingModule,
    EthCommonModule,
    EthCommonModule,
    MessagesModule,
    MetamaskModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [
    LayoutService,
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
