import { NgModule } from '@angular/core';
import { DateFormatterPipe } from './filters/date-formatter.pipe';
import { FileSizePipe } from './filters/file-size.pipe';
import { SanitizePipe } from './filters/sanitize.pipe';
import { SanitizeUrlPipe } from './filters/sanitize-url.pipe';
import { LocalizedDatePipe } from './filters/localized-date.pipe';

@NgModule({
  declarations: [
    DateFormatterPipe,
    FileSizePipe,
    LocalizedDatePipe,
    SanitizePipe,
    SanitizeUrlPipe
  ],
  exports: [
    DateFormatterPipe,
    FileSizePipe,
    LocalizedDatePipe,
    SanitizePipe,
    SanitizeUrlPipe
  ],
  providers: [
    DateFormatterPipe, FileSizePipe, LocalizedDatePipe
  ]
})
export class EthCommonModule {
}
