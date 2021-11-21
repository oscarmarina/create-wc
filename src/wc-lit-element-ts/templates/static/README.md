# \<<%= tagName %>>

![Lit](https://img.shields.io/badge/lit-2.0.0-blue)

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i <%= tagName %>
```

## Usage

```html
<script type="module">
  import '<%= tagName %>/<%= tagName %>.js';
</script>

<<%= tagName %>></<%= tagName %>>
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `vite`

```bash
npm start
```

To run a local development server that serves the basic demo located in demo/index.html
