/* eslint-disable import/no-commonjs */
const allowedOtherCases = ['given_name', 'family_name', 'email_verified'];

const shareRules = {
  'import/no-commonjs': 'error',
  'import/no-cycle': 'off',
  'import/named': 'error',
  'no-console': 'off',
};

const javascriptRules = {
  ...shareRules,
  'class-methods-use-this': 'off',
  camelcase: ['error', { allow: allowedOtherCases }],
  'no-restricted-syntax': 'off',
  'no-unused-vars': 'off',
  'no-shadow': 'off', // replaced by ts-eslint rule below
  'no-useless-constructor': 'off', // replaced by ts-eslint rule below
};

const typescriptRules = {
  ...shareRules,
  '@typescript-eslint/no-var-requires': 1,
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/no-useless-constructor': ['error'],
};

module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },

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
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
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
    ...javascriptRules,
  },

  overrides: [
    {
      files: ['*.ts'],
      extends: ['./eslint', './eslint/typescript'],
      rules: {
        ...javascriptRules,
        ...typescriptRules,
      },
    },
  ],

  globals: {
    window: true,
    expect: true,
    assert: true,
    document: true,
  },

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      webpack: {
        config: 'src/webpack.js',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
