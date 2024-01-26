# Web Component with Lit - Scaffolding

This scaffold generator extends and customizes the core parts of **[@open-wc/create](https://open-wc.org/docs/development/generator/#extending)** providing a starting point for creating a web component with **[Lit](https://lit.dev/)**

## Development tools:

- ### [Open Web Components](https://open-wc.org/) & [Modern Web](https://modern-web.dev/)

  - Scaffold
  - Lint&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`es-lint`
  - Format&nbsp;&nbsp;&nbsp;`prettier`
  - Test&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`web-test-runner`

- ### [Vite](https://vitejs.dev/)

  - [De Server](https://vitejs.dev/config/server-options.html)
  - [Preview](https://vitejs.dev/config/preview-options.html)
  - [Build](https://vitejs.dev/guide/build.html)
    - TypeScript & [tsconfig](https://github.com/lit/lit/blob/main/packages/lit-starter-ts/tsconfig.json)

- ### [Sass](https://github.com/oscarmarina/sass-style-template)

  - SCSS watcher with [sass](https://www.npmjs.com/package/sass)

- ### analyze
  - [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/blog/intro/)
    - [Plugin: cem-to-markdown-readme](https://github.com/oscarmarina/cem-to-markdown-readme)

<hr>

## Installation

```bash
npm init @blockquote/wc@latest
```

### Start

```bash
npm start
```

<hr>

### Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

### Testing with Web Test Runner

- playwright
- coverage
- TDD option

<br>

### web-test-runner.config

```js
import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter, summaryReporter } from '@web/test-runner';
import { coverageTableReporter } from '@blockquote/coverage-table-reporter';

const filteredLogs = ['in dev mode'];
const outDir = process.env.OUTDIR || '.';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: [`${outDir}/test/**/*.test.js`],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  concurrentBrowsers: 2,
  concurrency: 1,
  reporters: [summaryReporter({}), defaultReporter(), coverageTableReporter()],
  preserveSymlinks: true,
  coverage: true,
  coverageConfig: {
    reportDir: `${outDir}/test/coverage`,
    reporters: ['lcov', 'lcovonly', 'json'],
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    include: ['**/src/**/*', '**/define/**/*'],
  },
  testFramework: {
    config: {
      ui: 'tdd',
      timeout: 4000,
    },
  },
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some((l) => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },
});
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

### dev server

- Vite supports importing .ts files out of the box ([4848](https://github.com/vitejs/vite/issues/4848), [3040](https://github.com/vitejs/vite/issues/3040#issuecomment-940697809))

```bash
npm run vite
```

### For hosting a static demo purposes only - [Do not bundle](https://justinfagnani.com/2019/11/01/how-to-publish-web-components-to-npm/#do-not-bundle)

```bash
npm run dev:vite
```

```bash
npm run preview:vite
```

<hr>

### TypeScript

```bash
npm run build
```

<hr>

### sass

#### scss watcher

```bash
npm run sass:watch
```

<hr>

### Custom Element Manifest

#### Generating README from custom-elements.json

```bash
npm run analyze
```

### Husky

Husky is pre-installed.

After `git init`; run `npm run prepare` to set up Husky and its Git hooks.

<hr>

**Example:**

> - https://github.com/oscarmarina/blockquote-web-components

<hr>
