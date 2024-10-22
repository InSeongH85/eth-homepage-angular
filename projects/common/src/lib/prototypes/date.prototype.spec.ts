import './prototypes';

describe('DatePrototype', () => {
  it('1월의 날수는 31일이다.', () => {
    expect(new Date(2021, 0, 1).getDaysInMonth()).toBe(31);
    expect(new Date('2021-01-01').getDaysInMonth()).toBe(31);
  });
  it('6월의 날수는 30일이다.', () => {
    expect(new Date(2021, 5, 1).getDaysInMonth()).toBe(30);
    expect(new Date('2021-06-01').getDaysInMonth()).toBe(30);
  });
  it('2021-10-11의 한글 년월 표기는 2021년 10월 이다.', () => {
    const yearMonth = new Date('2021-10-11').toYearMonthString('ko');
    expect(yearMonth).toBe('2021년 10월');
  });
  it('2021-10-11의 영문 년월 표기는 Oct 2021 이다.', () => {
    const yearMonth = new Date('2021-10-11').toYearMonthString('en');
    expect(yearMonth).toBe('Oct 2021');
  });
});
