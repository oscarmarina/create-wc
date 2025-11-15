import js from '@eslint/js';
import openwcEslintConfig from '@open-wc/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['**/src/*/templates/**/*.js'],
  },
  js.configs.recommended,
  ...openwcEslintConfig,
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/src/**/*.html'],
    rules: {
      'import-x/no-unresolved': 'off',
    },
  },
  {
    files: ['**/test/**/*.js', '**/*.config.js'],
    rules: {
      'no-console': 'off',
      'no-unused-expressions': 'off',
      'max-classes-per-file': 'off',
    },
  },
];
