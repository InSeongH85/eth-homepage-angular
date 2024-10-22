import '@angular/localize/init';
import '../prototypes/prototypes';
import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  const pipe = new FileSizePipe();

  it('0 => 0 bytes', () => {
    expect(pipe.transform(0)).toBe('0 bytes');
  });
  it('83051 => 81.10 KB', () => {
    expect(pipe.transform(83051)).toBe('81.10 KB');
  });
  it('831513233 => 792.99 MB', () => {
    expect(pipe.transform(831513233)).toBe('792.99 MB');
  });

});
