import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import {fileURLToPath} from 'node:url';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/src/*/templates/**/*.js'],
  },
  ...compat.extends('@open-wc'),
  eslintConfigPrettier,
  {
    files: ['**/src/**/*.html'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    files: ['**/test/**/*.js', '**/*.config.js'],
    rules: {
      'no-console': 'off',
      'no-unused-expressions': 'off',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'import/no-extraneous-dependencies': 'off', // we moved all devDependencies to root
    },
  },
];
