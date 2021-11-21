import { defineConfig } from 'vite';
import pluginHtml from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy';
import summary from 'rollup-plugin-summary';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const minifyHTMLLiteralsConfig = {
  options: {
    minifyOptions: {
      removeAttributeQuotes: false,
    },
  },
};

const copyConfig = {
  targets: [
    {
      src: 'node_modules/@ungap/global-this/index.js',
      dest: 'dev/web_modules/@ungap/global-this',
    },
    {
      src: 'node_modules/lit/polyfill-support.js',
      dest: 'dev/web_modules/lit',
    },
    {
      src: 'node_modules/lit/polyfill-support.js.map',
      dest: 'dev/web_modules/lit',
    },
    {
      src: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
      dest: 'dev/web_modules/@webcomponents/webcomponentsjs',
    },
    {
      src: 'node_modules/@webcomponents/webcomponentsjs/bundles',
      dest: 'dev/web_modules/@webcomponents/webcomponentsjs',
    },
    {
      src: 'node_modules/@webcomponents/shadycss/custom-style-interface.min.js',
      dest: 'dev/web_modules/@webcomponents/shadycss',
    },
    {
      src: 'node_modules/@webcomponents/shadycss/custom-style-interface.min.js.map',
      dest: 'dev/web_modules/@webcomponents/shadycss',
    },
  ],
  hook: 'writeBundle',
};

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    pluginHtml({
      transformHtml: [
        html => html.replace(
          '<meta charset="utf-8">',
          `<meta charset="utf-8">
    <script src="./web_modules/@ungap/global-this/index.js"></script>
    <script src="./web_modules/lit/polyfill-support.js"></script>
    <script src="./web_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script src="./web_modules/@webcomponents/shadycss/custom-style-interface.min.js"></script>`,
        ),
      ],
    }),

    minifyHTML(minifyHTMLLiteralsConfig),
    copy(copyConfig),
    summary(),
  ],
  build: {
    outDir: 'dev',
    rollupOptions: {
      input: 'demo/*.html',
      output: {
        dir: 'dev/',
        format: 'es',
      },
    },
  },
});
