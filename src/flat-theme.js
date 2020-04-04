import flatten, { unflatten } from 'flat';
import convert from 'color-convert';
import { colorModel, colorString } from './color-model';

const delimiter = '.';

export const flattenTheme = theme => {
  const flattenTheme = flatten(theme, { delimiter });
  const parsedValues = Object.entries(flattenTheme).map(([key, val]) => {
    const model = colorModel(val);
    if (!model)
      return {
        key,
        noColor: true,
        value: val,
      };
    const hsl = convert.rgb.hsl(model.values);
    const saturation = hsl[1];
    return {
      key,
      ...model,
      hsl,
      saturation,
    };
  });

  const flattenColors = parsedValues
    .filter(({ noColor }) => !noColor)
    .sort((a, b) => b.saturation - a.saturation);

  const restValues = parsedValues.filter(({ noColor }) => noColor);

  return { flattenColors, restValues };
};

export const unflatTheme = ({ flattenColors, restValues }) => {
  const allValues = [...restValues, ...flattenColors];
  const allMap = allValues.reduce((obj, entry) => {
    if (entry.noColor) {
      return {
        ...obj,
        [entry.key]: entry.value,
      };
    }
    return {
      ...obj,
      [entry.key]: colorString(entry),
    };
  }, {});
  return unflatten(allMap);
};
