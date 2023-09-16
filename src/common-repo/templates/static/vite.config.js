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
  ],
  hook: 'writeBundle',
};

/**
 * https://vitejs.dev/config/
 * https://vite-rollup-plugins.patak.dev/
 */

export default defineConfig({
  build: {
    target: ['chrome70'],
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
        <script src="./web_modules/@ungap/global-this/index.js"></script>`,
              ),
          ],
        }),
        copy(copyConfig),
        totalBundlesize(),
      ],
    },
  },
});
