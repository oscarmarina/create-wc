/* eslint-disable import/no-extraneous-dependencies */
/* process.env.npm_lifecycle_event, process.env.npm_lifecycle_script, process.env.OUTDIR; */
import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter, summaryReporter } from '@web/test-runner';
import { coverageTableReporter } from '@blockquote/coverage-table-reporter';

const filteredLogs = ['in dev mode'];
const outDir = process.env.OUTDIR || '.';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: [`${outDir}/test/**/*.test.js`],

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'webkit' }),
  ],

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  concurrency: 1,

  reporters: [summaryReporter(), defaultReporter(), coverageTableReporter()],

  coverageConfig: {
    reportDir: `${outDir}/test/coverage`,
    reporters: ['lcov', 'lcovonly', 'json'],
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    exclude: ['**/node_modules/**/*', '**/web_modules/**/*', '**/__wds-outside-root__/**/*'],
  },

  testFramework: {
    config: {
      ui: 'tdd',
      timeout: 4000,
      reporter: 'html',
    },
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  // See documentation for all available options
});
