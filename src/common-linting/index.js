/* eslint-disable no-console */
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CommonLintingMixin = (subclass) =>
  class extends subclass {
    async execute() {
      await super.execute();
      // extend package.json
      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json')
      );
    }
  };
