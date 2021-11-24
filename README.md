# Web Component with Lit - Scaffolding

This scaffold generator extends and customizes the core parts of [@open-wc/create](https://open-wc.org/docs/development/generator/#extending) providing a starting point for creating a web component with [Lit](https://lit.dev/).

## Development tools:

- ### [open-wc](https://open-wc.org/) & [modern-web](https://modern-web.dev/)

  - Scaffold
  - Lint (es-lint)
  - Format (prettier)
  - Test (web-test-runner)

- ### [vitejs](https://vitejs.dev/)

  - Dev Server
  - Static demo
  - TypeScript

- ### [sass](https://github.com/oscarmarina/sass-style-template)

  - SCSS watcher with autoprefixer

- ### miscellany
  - [tsconfig](https://github.com/lit/lit/blob/main/packages/lit-starter-ts/tsconfig.json)
  - [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/blog/intro/)
  - [ESLint 8 - decorators](https://github.com/eslint/eslint/issues/15299#issuecomment-968099681)

<hr>

## Installation

```bash
npm init @blockquote/wc
```

<hr>
<br>

## open-wc & modern-web

### - Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

### - Testing with Web Test Runner

- mocha-style reporter
- coverage config
- TDD option

<br>

### web-test-runner.config

```js
import { defaultReporter } from '@web/test-runner';
import { mochaStyleReporter } from '@blockquote/test-runner-mocha-style-reporter';

const outDir = process.env.OUTDIR || '.';

export default ({
  files: [`${outDir}/test/**/*.test.js`],

  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  reporters: [
    defaultReporter(),
    mochaStyleReporter(),
  ],

  coverageConfig: {
    report: true,
    reportDir: `${outDir}/test/coverage`,
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },

  testFramework: {
    config: {
      ui: 'tdd',
    },
  },

  ...
};
```

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

<hr>
<br>

## vite

### dev server

- Vite supports importing .ts files out of the box ([4848](https://github.com/vitejs/vite/issues/4848), [3040](https://github.com/vitejs/vite/issues/3040#issuecomment-940697809))

```bash
npm run vite
```

### For hosting a static demo purposes only - [Do not bundle](https://justinfagnani.com/2019/11/01/how-to-publish-web-components-to-npm/#do-not-bundle)

```bash
npm run dev:vite
```

### [server static-deploy](https://vitejs.dev/guide/static-deploy.html)

```bash
npm run preview:vite
```

<hr>
<br>

## sass

### scss watcher with autoprefixer

```bash
npm run sass:watch
```

<hr>
<br>

## TypeScript

### build ts

```bash
npm run build
```

<hr>
<br>

### Start:

#### `"start": "concurrently -k -r \"npm:sass:watch\" \"npm:vite\""`

```bash
npm start
```

Example:

### [open-wc-vitejs-sass](https://github.com/oscarmarina/open-wc-vitejs-sass)

<hr>
<br>

## Different major versions:

```json
"devDependencies": {
  "eslint": "^8.0.0",
  "@open-wc/eslint-config": "^7.0.0",
  ...
}

```

open-wc scaffold

```json
"devDependencies": {
  "eslint": "^7.32.0",
  "@open-wc/eslint-config": "^4.3.0",
  ...
}

```

<hr>

## File structure JS & TS

```css
./
├── my-el/
│   ├── define/
│   │   └── my-el.{js,ts}
│   ├── demo/
│   │   └── index.html
│   ├── src/
│   │   ├── styles/
│   │   │   ├── MyEl-styles.{js,ts}
│   │   │   └── MyEl.scss
│   │   └── MyEl.{js,ts}
│   ├── test/
│   │   └── my-el.test.{js,ts}
│   ├── .editorconfig
│   ├── .gitignore
│   ├── index.html
│   ├── index.{js,ts}
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── web-dev-server.config.mjs
│   └── web-test-runner.config.mjs
```

<hr>

### the component definition is generated in its own folder

```css
./
├── my-el/
│   ├── define/
│   │   └── my-el.{js,ts}
```
