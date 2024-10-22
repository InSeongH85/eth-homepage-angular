import './prototypes';

describe('StringPrototype', () => {
  it('SOLARS의 길이는 6이다', () => {
    const str = 'SOLARS';
    expect(str.getEUCKRLength()).toBe(6);
  });
  it('솔라스의 길이는 6이다.', () => {
    const str = '솔라스';
    expect(str.getEUCKRLength()).toBe(6);
  });
  it('솔-라-스의 길이는 8이다.', () => {
    const str = '솔-라-스';
    expect(str.getEUCKRLength()).toBe(8);
  });
  it('i아이네크.의 길이는 10이다.', () => {
    const str = 'i아이네크.';
    expect(str.getEUCKRLength()).toBe(10);
  });
  it('히라가나 가타가나 변환', () => {
    const hira = '私は北の反探偵員であっ';
    expect(hira.toKata()).toBe('私ハ北ノ反探偵員デアッ');
  });

  it('MARC구분자 삭제', () => {
    let chars = '한국.미국;';
    expect(chars.removeMarcPunctuation()).toBe('한국.미국');
    chars = '한국.미국.';
    expect(chars.removeMarcPunctuation()).toBe('한국.미국');
  });

  it('특수문자 삭제', () => {
    const chars = '한국 !@#$%^&*()-_+={}[]|\:;\'",<>./?~`미국    ';
    expect(chars.removeSpecialChars()).toBe('한국미국');
  });
  it('숫자로된 문자에 콤마추가', () => {
    expect('123456.11'.addCommas()).toBe('123,456.11');
    expect('123456.0'.addCommas()).toBe('123,456.0');
    expect('1'.addCommas()).toBe('1');
    expect(''.addCommas()).toBe('');
    expect('1111'.addCommas()).toBe('1,111');
  });
});
