import { SHA256 } from './sha256.prototypes';

describe('SHA256', () => {
  it('JSON Object를 hashcode로 변환', () => {
    const str = {
      id: 1,
      name: 'sbc',
      code: null
    };
    expect(SHA256.getHashcode(str)).toBe('74f8b3e04d9d5c0a21884a9ef99bb17ca8c536131383689eae9bd492e4f426e0');
    const str2 = {
      id: 1,
      name: 'sbc',
      code: ''
    };
    expect(SHA256.getHashcode(str2)).toBe('74f8b3e04d9d5c0a21884a9ef99bb17ca8c536131383689eae9bd492e4f426e0');
    const str3 = {
      id: 1,
      name: 'sbc',
      code: '  '
    };
    expect(SHA256.getHashcode(str3)).toBe('8718d40571124ab0781a74d897ae1f1049e39c42b25517de87a42703448b9883');
    const str4 = {};
    expect(SHA256.getHashcode(str4)).toBe('44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a');
    const str5 = '';
    expect(SHA256.getHashcode(str5)).toBe('12ae32cb1ec02d01eda3581b127c1fee3b0dc53572ed6baf239721a03d82e126');
    const str6 = '  ';
    expect(SHA256.getHashcode(str6)).toBe('45d3802841073555f515b78291b24a513eae893f2729436ffb93951b0b3b80bf');
    const str7 = {
      id: 1,
      name: 'sbc',
      code: undefined
    };
    expect(SHA256.getHashcode(str7)).toBe('09462de658986806aa015cc22b74fbe7d324ceadb7d47702324cfdb4c6198fdc');
  });
});
