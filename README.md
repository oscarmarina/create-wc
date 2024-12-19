# Web Components with Lit - Scaffold

This scaffold generator extends and customizes **[@open-wc/create](https://open-wc.org/docs/development/generator/#extending)**, providing a starting point for creating web components with **[Lit](https://lit.dev/)**.

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

- **Test**: [Vitest browser mode](https://vitest.dev/guide/browser/)

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
npm run test
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

**Example:**

- [lit-vitest-testing-comparison](https://github.com/oscarmarina/lit-vitest-testing-comparison)
