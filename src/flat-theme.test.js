import { flattenTheme, unflatTheme } from './flat-theme';
import { theme } from './test-utils/theme';
import { palette } from './test-utils/palette';

describe('flatten theme', () => {
  test('should flatten', () => {
    const { flattenColors } = flattenTheme(theme);
    expect(flattenColors).toEqual(palette);
  });

  test('should unflaten', () => {
    const { flattenColors, restValues } = flattenTheme(theme);
    const restoredTheme = unflatTheme({ flattenColors, restValues });
    expect(restoredTheme).toEqual(theme);
  });

  test('possible changes', () => {
    const testTheme = {
      colors: {
        grey: '#e5e7e6',
        white: '#ffffff',
        semiWhite: 'rgba(255, 255, 255, 0.8)',
        semiBlack: 'hsla(0, 0%, 0%, 0.2)',
        textActive: 'hsla(0, 0%, 39%, 1)',
        border: 'solid',
        pink: '#d1256c',
        tabletHeader: '#9cA935',
        mobileHeader: 'red',
      },
    };
    const { flattenColors, restValues } = flattenTheme(testTheme);
    const changedColors = flattenColors.map(model => ({
      ...model,
      isChanged: true,
    }));
    const restoredTheme = unflatTheme({
      flattenColors: changedColors,
      restValues,
    });
    expect(restoredTheme).toEqual({
      colors: {
        border: 'solid',
        mobileHeader: '#ff0000',
        pink: '#d1256c',
        tabletHeader: '#9ca935',
        grey: '#e5e7e6',
        white: '#ffffff',
        semiWhite: 'rgba(255, 255, 255, 0.8)',
        semiBlack: 'hsla(0, 0%, 0%, 0.2)',
        textActive: 'hsl(0, 0%, 39%)',
      },
    });
  });
});
