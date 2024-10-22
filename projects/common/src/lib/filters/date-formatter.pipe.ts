import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  transform(date: string, format?: 'short' | 'dateHourMin' | 'full'): string {
    try {
      if (!date) return date;
      // 2023-08-30T02:44:32Z 와 같이 Timezone 표기가 있다면 ISO 로 인식한다.
      if (date.indexOf('T') > -1 && date.endsWith('Z')) {
        if (format === 'full') {
          return DateTime.fromISO(date).toFormat('yyyy-MM-dd HH:mm:ss');
        } else if (format === 'dateHourMin') {
          return DateTime.fromISO(date).toFormat('yyyy-MM-dd HH:mm');
        } else
          return DateTime.fromISO(date).toFormat('yyyy-MM-dd');
      }
      if (date.length === 19) {
        if (format === 'full' && !date.endsWith('00:00:00'))
          return DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy-MM-dd HH:mm:ss');
        else if (format === 'dateHourMin' && !date.endsWith('00:00:00'))
          return DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy-MM-dd HH:mm');
        else
          return DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy-MM-dd');
      }
      if (date.length === 14) {
        if (format === 'full' && !date.endsWith('000000'))
          return DateTime.fromFormat(date, 'yyyyMMddHHmmss').toFormat('yyyy-MM-dd HH:mm:ss');
        else if (format === 'dateHourMin' && !date.endsWith('000000'))
          return DateTime.fromFormat(date, 'yyyyMMddHHmmss').toFormat('yyyy-MM-dd HH:mm');
        else
          return DateTime.fromFormat(date, 'yyyyMMddHHmmss').toFormat('yyyy-MM-dd');
      }
      if (date.length === 8)
        return DateTime.fromFormat(date, 'yyyyMMdd').toFormat('yyyy-MM-dd');
      return date;
    } catch {
      return date;
    }
  }
}
