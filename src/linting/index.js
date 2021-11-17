/* eslint-disable no-console */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { LintingEsLintMixin } from '../linting-eslint/index.js';
import { LintingPrettierMixin } from '../linting-prettier/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const LintingMixin = subclass =>
  class extends LintingPrettierMixin(LintingEsLintMixin(subclass)) {
    async execute() {
      await super.execute();

      // extend package.json
      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json'),
      );
    }
  };






