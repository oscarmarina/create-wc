import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '.idea',
      '.vscode',
      '*.code-workspace',
      '**/.DS_Store',
      '**/node_modules',
      '**/npm-debug.log',
      '**/*-debug.log',
      '**/yarn-error.log',
      '**/coverage',
      '**/coverage/',
      '**/reports',
      '**/__snapshots__',
      'screenshots/.current',
      'screenshots/.diff',
      '**/_site',
      '**/dist',
      '**/dev',
      '**/build',
      '**/.tmp',
      '**/*.tgz',
      '**/*.tsbuildinfo',
      '**/storybook-static',
      '**/*.d.ts',
      '**/*.config.*',
      '**/package-lock.json',
      '**/*.min.js',
      '**/*-styles.*',
      '**/CHANGELOG.md',
    ],
  },
  ...compat.extends('@open-wc', 'plugin:@typescript-eslint/recommended', 'prettier'),
  {
    files: ['**/*.html'],
    plugins: {
      '@html-eslint': html,
    },
    languageOptions: {
      parser: htmlParser,
    },
    rules: {
      '@html-eslint/indent': ['error', 2],
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-loss-of-precision': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'class-methods-use-this': 'off',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],

      'object-curly-newline': 'off',

      'import/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
        },
      ],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/test/**/*.{js,ts}',
            '**/*.config.{js,ts,mjs,cjs}',
            '**/*.conf.{js,ts,mjs,cjs}',
          ],
        },
      ],

      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',

      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ['PropertyDefinition', 'TemplateLiteral > *'],
        },
      ],

      'lit/no-classfield-shadowing': 'off',
      'lit/no-native-attributes': 'off',
      'lit-a11y/click-events-have-key-events': 'off',
    },
  },
];
