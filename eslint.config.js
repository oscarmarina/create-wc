import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/.idea',
      '**/.tmp',
      '**/.vscode',
      '**/.wireit',
      '**/_site',
      '**/build',
      '**/coverage',
      '**/dev',
      '**/dist',
      '**/reports',
      '**/storybook-static',
      '**/*screenshots*',
      '**/*snapshots*',
      'src/**/templates/**',
      '**/*.config.*',
      '**/*.d.ts',
      '**/*.min.js',
      '**/*.workspace.*',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2023,
        ...globals.mocha,
      },
    },
  },
  {
    files: ['src/create.js', 'src/Generator.js', 'src/app/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
];
