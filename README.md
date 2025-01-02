# Web Components with Lit - Scaffold

This scaffold generator extends and customizes **[@open-wc/create](https://open-wc.org/docs/development/generator/#extending)**, providing a starting point for creating web components with **[Lit](https://lit.dev/)**.

**Example:**

[![Open in GitHub](https://img.shields.io/badge/Open_in_GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/oscarmarina/lit-vitest-testing-comparison)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oscarmarina/lit-vitest-testing-comparison)

<hr>

## Development Tools

### Scaffold

- Lint: `eslint`
- Format: `prettier`

### Vite & Vitest

- **Server**: [Vite Server](https://vitejs.dev/config/server-options.html)
- **Preview**: [Vite Preview](https://vitejs.dev/config/preview-options.html)
- **Build**: [Vite Build](https://vitejs.dev/guide/build.html)

  - TypeScript: [`vite` transpile only](https://vite.dev/guide/features.html#typescript)
  - TypeScript: [`tsc` emit declarations only](https://www.typescriptlang.org/tsconfig/#emitDeclarationOnly)

- **Test**: [Vitest browser mode](https://vitest.dev/guide/browser/) and [chai-a11y-axe](https://www.npmjs.com/package/chai-a11y-axe)

- ### Sass

  - SCSS [watcher](https://github.com/oscarmarina/sass-style-template) with [sass](https://www.npmjs.com/package/sass)

- ### analyze
  - [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/blog/intro/)
    - [Plugin: cem-to-markdown-readme](https://github.com/oscarmarina/cem-to-markdown-readme)

<hr>

## Installation

```bash
npm init @blockquote/wc
```

### Start

```bash
npm start
```

<hr>

### Linting and Formatting

To scan the project for linting and formatting errors, run:

```bash
npm run lint
```

To automatically fix them, run:

```bash
npm run format
```

### Testing

Run tests with:

```bash
// vitest --run --browser.headless

npm run test
```

```bash
// vitest

npm run test:watch
```

<hr>

### Development Server

Start the development server:

```bash
npm run start
```

### Hosting a Static Demo (Do Not Bundle)

For hosting a static demo without bundling:

```bash
npm run dev:vite
```

Preview demo:

```bash
npm run preview:vite
```

<hr>

### TypeScript

```bash
npm run build
```

<hr>

### Sass

#### SCSS Watcher

Start the SCSS watcher:

```bash
npm run sass:watch
```

<hr>

### Custom Elements Manifest

#### Generating README from `custom-elements.json`

Generate documentation:

```bash
npm run analyze
```

### Husky

Husky is pre-installed.

After initializing Git with `git init`, run:

```bash
npm run prepare
```

to set up Husky and its Git hooks.

<hr>

**Plugins:**

- [rollup-plugin-externalize-source-dependencies](https://github.com/oscarmarina/rollup-plugin-externalize-source-dependencies)

- [vite-plugin-prevent-rewrite-imports-type-module](https://github.com/oscarmarina/vite-plugin-prevent-rewrite-imports-type-module/tree/main)
