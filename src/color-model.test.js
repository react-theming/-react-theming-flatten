import { colorModel } from './color-model';

describe('is color should detect', () => {
  test('wrong colors', () => {
    const color = colorModel('');
    expect(color).toBeNull();
  });
  test('hex colors', () => {
    const color = colorModel('hz');
    expect(color).toEqual({});
  });
});
