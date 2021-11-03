# Web Component with Lit project scaffolding

This scaffold generator extends and customizes the core parts of [@open-wc/create](https://open-wc.org/docs/development/generator/#extending) providing a starting point for creating a web component with [Lit](https://lit.dev/).

## Development tools:

- ### [open-wc](https://open-wc.org/) & [modern-web](https://modern-web.dev/)

  - Scaffold
  - Lint (es-lint)
  - Format (prettier)
  - Test (web-test-runner)

- ### [vitejs](https://vitejs.dev/)

  - Dev Server
  - Optimized Build
  - TypeScript

- ### [sass](https://github.com/oscarmarina/sass-style-template)
  - SCSS watcher with autoprefixer

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

export default {
  reporters: [defaultReporter(), mochaStyleReporter()],

  coverageConfig: {
    report: true,
    reportDir: 'test/coverage',
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

```bash
npm run vite
```

### build command


```bash
npm run vite-build
```
- [vitejs - server static-deploy](https://vitejs.dev/guide/static-deploy.html)

```bash
npm run vite-previes
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
<br>

### Start:

#### `"start": "concurrently -k -r \"npm:sass:watch\" \"npm:vite\""`

```bash
npm start
```

<hr>

## scripts - package.json

```json
"scripts": {
    "analyze": "cem analyze --litelement --globs \"{src,define}/**/*.{js,ts}\" \"index.js\"",
    "format": "eslint --ext .js,.html . --fix --ignore-path .gitignore && prettier \"**/*.js\" --write --ignore-path .gitignore",
    "postinstall": "npm run sort:package",
    "lint": "eslint --ext .js,.html . --ignore-path .gitignore && prettier \"**/*.js\" --check --ignore-path .gitignore",
    "openwc": "web-dev-server",
    "sass:watch": "sass-style-template",
    "sort:package": "npx sort-package-json",
    "start": "concurrently -k -r \"npm:sass:watch\" \"npm:vite\"",
    "start:openwc": "concurrently -k -r \"npm:sass:watch\" \"npm:openwc\"",
    "test": "web-test-runner --coverage",
    "test:watch": "web-test-runner --watch",
    "vite": "vite",
    "vite-build": "vite build",
    "vite-preview": "vite preview",
    "wca": "wca analyze \"{src,define}/**/*.{js,ts}\" \"index.js\" --visibility private --outFile custom-elements-wca.json && wca analyze \"{src,define}/**/*.{js,ts}\" \"index.js\" --outFile README.md"
  },
```

<hr>
<br>

## Different major versions:

blockquote scaffold

```json
"devDependencies": {
  "eslint": "^8.0.0",
  "@open-wc/eslint-config": "^7.0.0",
  "husky": "^7.0.0",
  "lint-staged": "^11.0.0",
  ...
}

```

open-wc scaffold

```json
"devDependencies": {
  "eslint": "^7.32.0",
  "@open-wc/eslint-config": "^4.3.0",
  "husky": "^4.3.8",
  "lint-staged": "^10.5.4",
  ...
}

```

<hr>

## File structure

```css
./
├── my-el/
│   ├── define/
│   │   └── my-el.js
│   ├── demo/
│   │   └── index.html
│   ├── src/
│   │   ├── styles/
│   │   │   ├── MyEl-styles.js
│   │   │   └── MyEl.scss
│   │   └── MyEl.js
│   ├── test/
│   │   └── my-el.test.js
│   ├── .editorconfig
│   ├── .gitignore
│   ├── index.html
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── web-dev-server.config.mjs
│   └── web-test-runner.config.mjs
```

### the component definition is generated in its own folder
```css
./
├── my-el/
│   ├── define/
│   │   └── my-el.js
```
```js
import { MyEl } from '../src/MyEl.js';

customElements.define(MyEl.is, MyEl);
```
