import './prototypes';

describe('NumberPrototype', () => {
  it('1.1의 올림은 2이다.', () => {
    const num = 1.1;
    expect(num.roundUp()).toBe(2);
  });
  it('1.5의 올림은 2이다.', () => {
    const num = 1.5;
    expect(num.roundUp()).toBe(2);
  });
  it('1.7의 올림은 2이다.', () => {
    const num = 1.7;
    expect(num.roundUp()).toBe(2);
  });
  it('1.0의 올림은 1이다.', () => {
    const num = 1.0;
    expect(num.roundUp()).toBe(1);
  });
});
