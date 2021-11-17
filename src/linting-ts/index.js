/* eslint-disable no-console */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TsLintingEsLintMixin } from '../linting-eslint-ts/index.js';
import { TsLintingPrettierMixin } from '../linting-prettier-ts/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TsLintingMixin = subclass =>
  class extends TsLintingPrettierMixin(TsLintingEsLintMixin(subclass)) {
    async execute() {
      await super.execute();

      // extend package.json
      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json'),
      );
    }
  };
