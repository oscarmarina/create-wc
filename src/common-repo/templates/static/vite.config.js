/* eslint-disable implicit-arrow-linebreak */
import { defineConfig } from 'vite';
import { rollupPluginHTML as pluginHtml } from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy';
import totalBundlesize from '@blockquote/rollup-plugin-total-bundlesize';

const copyConfig = {
  targets: [
    {
      src: 'node_modules/@ungap/global-this/index.js',
      dest: 'dev/web_modules/@ungap/global-this',
    },
    {
      src: 'node_modules/tiny-array-flat-polyfill/tiny-array-flat-polyfill.min.js',
      dest: 'dev/web_modules/tiny-array-flat-polyfill',
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

/**
 * https://vitejs.dev/config/
 * https://vite-rollup-plugins.patak.dev/
 */

export default defineConfig({
  build: {
    target: ['edge18'],
    outDir: 'dev',
    rollupOptions: {
      input: 'demo/*.html',
      output: {
        dir: 'dev/',
        format: 'es',
      },
      plugins: [
        pluginHtml({
          transformHtml: [
            (html) =>
              html.replace(
                '<meta charset="utf-8">',
                `<meta charset="utf-8">
        <script src="./web_modules/@ungap/global-this/index.js"></script>
        <script src="./web_modules/tiny-array-flat-polyfill/tiny-array-flat-polyfill.min.js"></script>
        <script src="./web_modules/lit/polyfill-support.js"></script>
        <script src="./web_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
        <script src="./web_modules/@webcomponents/shadycss/custom-style-interface.min.js"></script>`,
              ),
          ],
        }),
        copy(copyConfig),
        totalBundlesize(),
      ],
    },
  },
});
