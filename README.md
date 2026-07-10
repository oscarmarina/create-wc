# create-wc

`create-wc` extends **[@open-wc/create](https://open-wc.org/docs/development/generator/#extending)** and scaffolds **[Lit](https://lit.dev/)** web components with a batteries-included setup for linting, formatting, testing, Sass, Vite, and Custom Elements Manifest generation.

Example output:

[![Open in GitHub](https://img.shields.io/badge/Open_in_GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/oscarmarina/lit-vitest-testing-comparison)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oscarmarina/lit-vitest-testing-comparison)

## Tutorial

Use this section if you want the shortest path from zero to a working component.

### Create a project

```bash
npm init @blockquote/wc
```

The generator will ask for:

- The custom element tag name
- An optional namespace
- Whether the project should use TypeScript

### Start development

After the project is generated:

```bash
cd your-project-name
npm install
npm start
```

`npm start` runs the Vite workflow together with the Sass watcher.

## How-to Guides

Use these commands once you already have a generated project.

### Format the generated project

```bash
npm run format
```

This runs ESLint, Prettier, and Stylelint fixes.

### Run tests

```bash
npm run test
```

For interactive browser testing:

```bash
npm run test:watch
```

### Preview the demo output

Build the demo assets:

```bash
npm run dev:vite
```

Preview the built output:

```bash
npm run preview:vite
```

### Build the TypeScript variant

In TypeScript projects:

```bash
npm run build
```

This runs Vite for bundling and `tsc` for declarations.

### Regenerate Custom Elements documentation

```bash
npm run analyze
```

### Enable Husky hooks

After `git init`, run:

```bash
npm run prepare
```

## Reference

### What the generator includes

- **Lit** for component authoring
- **Vite** for local development and preview builds
- **Vitest** in browser mode plus `chai-a11y-axe` for testing
- **ESLint**, **Prettier**, and **Stylelint** for code quality
- **Sass** via [sass-style-template](https://github.com/oscarmarina/sass-style-template)
- **Custom Elements Manifest** generation and README tooling

### Generated project scripts

These scripts are available in generated projects.

| Script                 | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `npm start`            | Run Vite and the Sass watcher together           |
| `npm run vite`         | Start the Vite dev server                        |
| `npm run dev:vite`     | Build the demo assets                            |
| `npm run preview:vite` | Preview the built demo                           |
| `npm run test`         | Run Vitest                                       |
| `npm run test:watch`   | Run Vitest in browser mode without headless mode |
| `npm run analyze`      | Generate the Custom Elements Manifest            |
| `npm run prepare`      | Install Husky hooks                              |
| `npm run format`       | Run ESLint, Prettier, and Stylelint fixes        |
| `npm run sass:watch`   | Run the Sass watcher                             |

### Variant-specific scripts

JavaScript projects:

- `npm run build` prints a message because there is no TypeScript build step.

TypeScript projects:

- `npm run build` runs the library build and TypeScript declaration output.

### Maintainer scripts for this repository

These scripts belong to this generator repository itself, not to generated projects.

| Script           | Purpose                   |
| ---------------- | ------------------------- |
| `npm start`      | Run the generator locally |
| `npm run format` | Format this repository    |

## Explanation

This project exists to provide a more opinionated starting point than raw `@open-wc/create`, while still building on its generator model instead of replacing it.

The generated scaffold is aimed at teams building Lit-based web components that want:

- A ready-to-run development setup
- Sass support out of the box
- Test tooling for browser-oriented component work
- Linting and formatting defaults across JavaScript, TypeScript, HTML, and styles
- Custom Elements Manifest generation as part of the workflow

The repository itself is intentionally small: it assembles mixins and templates that define the generated project structure and scripts.

## Related Links

- [rollup-plugin-total-bundlesize](https://github.com/oscarmarina/rollup-plugin-total-bundlesize)
- [vite-plugin-prevent-rewrite-imports-type-module](https://github.com/oscarmarina/vite-plugin-prevent-rewrite-imports-type-module/tree/main)
- [Create TypeScript Declarations from JavaScript JSDoc](https://humanwhocodes.com/snippets/2020/10/create-typescript-declarations-from-javascript-jsdoc/)
