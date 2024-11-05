import '@angular/localize/init';
import { CryptoService } from './crypto.service';
import { CommonService } from '../../../common/src/public-api';
import { environment } from '../../../sites/eth/src/environments/environment';

const inputs = [
  { plainText: '91da5aba061543259f22e9fce7816b83', encryptedText: 'n4/LfGF5zGvodNx8C4B68sgH3HLYntdH7stfLWXMWtLZLn0Py+U2I4IJ6Ajc6X5b' },
];

describe('CryptoService', () => {
  let cryptoService: CryptoService;
  const service = new CommonService(environment);
  const key = service.getConfig('ENCRYPT_KEY');

  beforeEach(() => {
    cryptoService = new CryptoService(service);
  });

  it('암호화', () => {
    inputs.forEach(input => {
      expect(cryptoService.encodeByAES256(key, input.plainText)).toBe(input.encryptedText);
    });
  });
  it('복호화', () => {
    inputs.forEach(input => {
      expect(cryptoService.decodeByAES256(key, input.encryptedText)).toBe(input.plainText);
    });
  });
});
