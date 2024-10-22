import '@angular/localize/init';

import { environment } from '../../../../sites/eth/src/environments/environment';
import { CommonService } from '../common.service';
import { LocalizedDatePipe } from './localized-date.pipe';
import '../prototypes/prototypes';
import { DateTime } from 'luxon';

describe('LocalizedDatePipe', () => {
  const service = new CommonService(environment);
  const pipe = new LocalizedDatePipe(service);

  it('기본적으로 년-월-일이 로케일 설정에 맞게 표시되어야 한다.', () => {
    const year = new Date().getFullYear();
    expect(pipe.transform(`${year}-11-01`)).toBe(`${year}년 11월 1일`);
  });
  it('기본적으로 년월일이 로케일 설정에 맞게 표시되어야 한다.', () => {
    const year = new Date().getFullYear();
    expect(pipe.transform(`${year}1101`)).toBe(`${year}년 11월 1일`);
  });
  it('dateHourMin일 때 년-월-일 시:분가 로켈일 설정에 맞게 표시되어야 한다.', () => {
    const m = DateTime.now();
    const dateStr = m.toFormat('yyyy-MM-dd HH:mm:ss');
    const date = m.toJSDate();
    const time = new Intl.DateTimeFormat('ko', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
    expect(pipe.transform(`${dateStr}`, 'dateHourMin')).toBe(`${time}`);
  });
  it('full일 때 년-월-일 시:분:초가 로켈일 설정에 맞게 표시되어야 한다.', () => {
    const m = DateTime.now();
    const dateStr = m.toFormat('yyyy-MM-dd HH:mm:ss');
    const date = m.toJSDate();
    const time = new Intl.DateTimeFormat('ko', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date);
    expect(pipe.transform(`${dateStr}`, 'full')).toBe(`${time}`);
  });
  it('full일 때 년-월-일 00:00:00인 날짜는 short형태로 로켈일 설정에 맞게 표시되어야 한다.', () => {
    const m = DateTime.now();
    const dateStr = m.toFormat('yyyy-MM-dd') + ' 00:00:00';
    const date = m.toJSDate();
    const time = new Intl.DateTimeFormat('ko', { year: 'numeric', month: 'short', day: 'numeric'}).format(date);
    expect(pipe.transform(`${dateStr}`, 'full')).toBe(`${time}`);
  });
});
