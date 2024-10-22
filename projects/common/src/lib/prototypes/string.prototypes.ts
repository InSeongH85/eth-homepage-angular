interface String {
  equalsIgnoreCase(s: string): boolean;
  padLeft(n: number, c?: string): string;
  isNumber(): boolean;
  extractDigits(): string;
  removeMarcPunctuation(): string;
  removeSpecialChars(): string;
  addBrTag(): string;
  toYMD(): string;
  toFormat(format: string): string;
  removeHtmlTag(): string;
  toMobilePhoneNoFormat(): string;
  toFunction(): Function;
  getEUCKRLength(): number;
  toKata(): string;
  addCommas(): string;
}

String.prototype.equalsIgnoreCase = function(s: string) {
  return this.toLowerCase().trim() === s.toLowerCase().trim();
};

String.prototype.padLeft = function(n: number, c: string = '0') {
  if (this.length >= n) return this;
  return (c.repeat(n) + this).slice(-1 * n);
};

String.prototype.isNumber = function(): boolean {
  return ((this !== '') && !isNaN(Number(this)));
};

String.prototype.extractDigits = function() {
  if (!this) return;
  return this.replace(/[^0-9]/g, '');
};

String.prototype.removeMarcPunctuation = function() {
  return this.replace(/[.:;,+=\/$]*$/g, '');
};

String.prototype.removeSpecialChars = function() {
  return this.replace(/[ !@#$%^&\*\(\)\{\}\[\]\-_\|.:;,+=\/$'"<>\?~`]*/g, '');
};

String.prototype.addBrTag = function() {
  if (/<\/?[a-z][\s\S]*>/i.test(this)) return this;
  return this.replace(/\n/g, '<br />');
};

/**
 * DateTime.toFormat과 호환을 위해서 string.toFormat을 만든다.
 * DatePicker의 값이 string일 경우에 toFormat이 없어 오류가 발생하는 문제를 해결하기 위함.
 */
String.prototype.toFormat = function(format: string) {
  return this;
};

String.prototype.toYMD = function() {
  try {
    if (this.length == 8) return this.substring(0, 4) + '-' + this.substring(4, 6) + '-' + this.substring(6);
    return new Date(this).toYMD();
  } catch {
    return this;
  }
};

String.prototype.removeHtmlTag = function() {
  return this.replace(/(<([^>]+)>)/ig, '');
};

String.prototype.toMobilePhoneNoFormat = function() {
  const phoneNoPattern = /[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
  if (!this || phoneNoPattern.test(this)) return this;
  if (/^\d{11}$/.test(this))
    return this.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
};

/**
 * agGroupCellRenderer 같은 agGrid 자체 함수의 경우에는 변환하지 않는다.
 */
String.prototype.toFunction = function() {
  if (this.indexOf('ag') === 0) return;
  return (new Function('return ' + this))();
};

String.prototype.getEUCKRLength = function() {
  if (!this) return 0;
  return this.split('')
    .map((s: string) => s.charCodeAt(0))
    .reduce((prev: number, c: number) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
};

String.prototype.toKata = function() {
  if (!this) return '';
  let kata = '';
  for (let i = 0; i < this.length; i++) {
    const c: number = this.charCodeAt(i);
    if ((c >= 12353 && c <= 12435) || c == 12445 || c == 12446)
      kata += String.fromCharCode(c + 96);
    else
      kata += this.charAt(i);}
  return kata;
};

String.prototype.addCommas = function() {
  if (!this) return this;
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
