interface Date {
  isLeapYear(): boolean;
  getDayOfYear(): number;
  getDaysInMonth(): number;
  toYearMonthString(locale: string): string;
  toYMD(): string;
}

Date.prototype.isLeapYear = function() {
  const year = this.getFullYear();
  if ((year & 3) !== 0) return false;
  return ((year % 100) !== 0 || (year % 400) == 0);
};

Date.prototype.getDayOfYear = function() {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = this.getMonth();
  const dn = this.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};

Date.prototype.getDaysInMonth = function() {
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) return 31;
  if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
  if (this.isLeapYear(year)) return 29;
  return 28;
};

Date.prototype.toYearMonthString = function(locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' }).format(this);
};

Date.prototype.toYMD = function(): string {
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const day = this.getDate();
  return year.padZeroLeft(4) + '-' + month.padZeroLeft(2) + '-' + day.padZeroLeft(2);
};
