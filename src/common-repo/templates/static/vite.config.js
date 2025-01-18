import {defineConfig} from 'vite';
import copy from 'rollup-plugin-copy';
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

const entriesDir = 'demo';
const entriesGlob = [`${entriesDir}/entry.js`];

// https://github.com/vitejs/vite/discussions/1736#discussioncomment-5126923
const entries = Object.fromEntries(
  entriesGlob.map((file) => {
    const [key] = file.match(new RegExp(`(?<=${entriesDir}\/).*`)) || [];
    return [key?.replace(/\.[^.]*$/, ''), file];
  })
);

// https://vitejs.dev/config/
// https://vite-rollup-plugins.patak.dev/

export default defineConfig({
  plugins: [
    externalizeSourceDependencies(['/__web-dev-server__web-socket.js']),
    copy(copyConfig),
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
      input: entries,
      output: {
        dir: 'dev/',
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
  },
});
