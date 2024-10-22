import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../common.service';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {
  private locale: string;

  constructor(private commonService: CommonService) {
    this.locale = this.commonService.getConfig('LOCALE', 'ko');
  }

  private getYearMonthDateOnly(d: Date): string {
    return new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
  }

  private getYearMonthDateHourMinute(d: Date): string {
    return new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(d);
  }

  private getYearMonthDateHourMinuteSecond(d: Date): string {
    return new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(d);
  }

  transform(date: string | Date, format?: 'short' | 'dateHourMin' | 'full'): string | Date {
    try {
      if (!date) return date;
      if (typeof date === 'string') {
        if (date.length === 19 && !date.endsWith('00:00:00')) {
          const d = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss').toJSDate();
          if (format === 'full')
            return this.getYearMonthDateHourMinuteSecond(d);
          else if (format === 'dateHourMin')
            return this.getYearMonthDateHourMinute(d);
        }
        if (date.length === 8) {
          const d = DateTime.fromFormat(date, 'yyyyMMdd').toJSDate();
          return this.getYearMonthDateOnly(d);
        } else {
          const d = DateTime.fromFormat(date.substring(0, 10), 'yyyy-MM-dd').toJSDate();
          return this.getYearMonthDateOnly(d);
        }
      } else {
        if (format === 'full')
          return this.getYearMonthDateHourMinuteSecond(date);
        if (format === 'dateHourMin')
          return this.getYearMonthDateHourMinute(date);
        return this.getYearMonthDateOnly(date);
      }
    } catch {
      return date;
    }
  }
}
