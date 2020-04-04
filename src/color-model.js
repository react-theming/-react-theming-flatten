import rgba from 'color-rgba';
import isColorStop from 'is-color-stop';
import Color from 'color';
import rgbHex from 'rgb-hex';

const isRGB = str => /^rgb/.test(str);
const isHSL = str => /^hsl/.test(str);
const isHex = str => /^#/.test(str);

const round = values => values.map(v => Math.round(v * 100) / 100);

export const colorModel = string => {
  if (!string) {
    return null;
  }
  const isColor = isColorStop.isColor(string);
  if (!isColor) {
    return null;
  }
  const values = rgba(string);
  if (!values || !values.length) {
    return null;
  }

  if (values[3] === 1) {
    values.pop();
  }
  const model = {
    values: round(values),
    format: 'keyword',
    isChanged: false,
    original: string,
  };
  if (isRGB(string)) {
    model.format = 'rgb';
  }
  if (isHSL(string)) {
    model.format = 'hsl';
  }
  if (isHex(string)) {
    model.format = 'hex';
  }
  return model;
};

export const colorString = model => {
  const { format, values, isChanged, original } = model;
  if (!isChanged) {
    return original;
  }
  const color = Color.rgb(values);

  if (format === 'hex' || format === 'keyword') {
    return `#${rgbHex(...values).toLowerCase()}`;
  }
  if (format === 'rgb') {
    return color.rgb().string();
  }
  return color.hsl().string();
};
