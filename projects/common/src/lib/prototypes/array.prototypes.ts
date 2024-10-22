interface Array<T> {
  pushArray(arr: Array<any>): void;
}

Array.prototype.pushArray = function(arr: Array<any>) {
  for (const x of arr) {
    this.push(x);
  }
};
