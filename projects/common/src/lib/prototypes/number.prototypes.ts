interface Number {
  padZeroLeft(n: number): string;
  roundUp(): number; // 올림
}

Number.prototype.padZeroLeft = function(n: number) {
  const num: string = this.toString();
  if (num.length >= n) return num;
  return ('0'.repeat(n) + num).slice(-1 * n);
};

Number.prototype.roundUp = function() {
  if (this % 1 >= 0.5) return Math.round(this);
  if (this % 1 > 0) return Math.round(this) + 1;
  return Math.round(this);
};