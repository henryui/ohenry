// eslint-disable-next-line import/no-commonjs
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import'],
  extends: ['airbnb-base', 'plugin:import/typescript', 'prettier'],
  rules: {
    'class-methods-use-this': 'warn',
    'consistent-return': 'off',
    'global-require': 'off',
    'no-await-in-loop': 'warn',
    'no-param-reassign': 'warn',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': 'warn',
    'no-use-before-define': ['error', { functions: false }],
    strict: 'error',

    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
