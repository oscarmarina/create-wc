import {defineConfig} from 'vite';
import copy from 'rollup-plugin-copy';
import multi from '@rollup/plugin-multi-entry';
import totalBundlesize from '@blockquote/rollup-plugin-total-bundlesize';
import externalizeSourceDependencies from '@blockquote/rollup-plugin-externalize-source-dependencies';

const copyConfig = {
  targets: [
    {
      src: 'demo/*.html',
      dest: 'dev/',
    },
  ],
  hook: 'writeBundle',
};

const outDir = process.env.OUTDIR || '.';

export default defineConfig({
  plugins: [
    externalizeSourceDependencies(['/__web-dev-server__web-socket.js']),
    copy(copyConfig),
    multi({entryFileName: 'entry.js'}),
    totalBundlesize(),
  ],
  optimizeDeps: {
    exclude: ['lit', 'lit-html'],
  },
  build: {
    target: ['chrome71'],
    outDir: 'dev',
    rollupOptions: {
      preserveEntrySignatures: 'exports-only',
      input: ['demo/*.js'],
      output: {
        dir: 'dev/',
        format: 'es',
      },
    },
  },
});
