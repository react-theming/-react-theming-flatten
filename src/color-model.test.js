import { colorModel, colorString } from './color-model';

describe('is color should detect', () => {
  test('wrong colors', () => {
    expect(colorModel('')).toBeNull();
    expect(colorModel('asd')).toBeNull();
    expect(colorModel('rgb')).toBeNull();
    expect(colorModel('brawn')).toBeNull();
    expect(colorModel('#6495ede')).toBeNull();
    expect(colorModel('rgb(200,0)')).toBeNull();
    expect(colorModel('rgba(200,0, 50)')).toBeNull();
  });
  test('keyword colors', () => {
    const color = colorModel('cornflowerblue');
    expect(color.format).toBe('keyword');
    expect(color.values).toEqual([100, 149, 237]);
  });
  test('hex colors', () => {
    const color = colorModel('#6495ed');
    expect(color.format).toBe('hex');
    expect(color.values).toEqual([100, 149, 237]);
    expect(colorString(color)).toBe('#6495ed');
  });
  test('hex colors with alfa', () => {
    const color = colorModel('#6495ed87');
    expect(color.format).toBe('hex');
    expect(color.values).toEqual([100, 149, 237, 0.53]);
    expect(colorString(color)).toBe('#6495ed87');
  });
  test('rgb colors', () => {
    const color = colorModel('rgb(100, 149, 237)');
    expect(color.format).toBe('rgb');
    expect(color.values).toEqual([100, 149, 237]);
    expect(colorString(color)).toBe('rgb(100, 149, 237)');
  });
  test('rgb colors with alfa', () => {
    const color = colorModel('rgba(100, 149, 237, 0.5)');
    expect(color.format).toBe('rgb');
    expect(color.values).toEqual([100, 149, 237, 0.5]);
    expect(colorString(color)).toBe('rgba(100, 149, 237, 0.5)');
  });
  test('hsl colors', () => {
    const color = colorModel('hsl(219, 79%, 66%)');
    expect(color.format).toBe('hsl');
    expect(color.values).toEqual([99.81, 147.75, 236.79]);
    expect(colorString(color)).toBe('hsl(219, 79%, 66%)');
  });
  test('hsl colors with alfa', () => {
    const color = colorModel('hsla(219, 79%, 66%, 0.5)');
    expect(color.format).toBe('hsl');
    expect(color.values).toEqual([99.81, 147.75, 236.79, 0.5]);
    expect(colorString(color)).toBe('hsla(219, 79%, 66%, 0.5)');
  });
});
