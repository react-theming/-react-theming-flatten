const prettier = require('./.prettierrc.js');
const error = 2;
const warn = 1;
const ignore = 0;

module.exports = {
  root: true,
  extends: ['plugin:jest/recommended', 'prettier'],
  plugins: ['prettier', 'jest', 'json'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  rules: {
    'prettier/prettier': [warn, prettier],
  },
};
