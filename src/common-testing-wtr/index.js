/* eslint-disable no-console */
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CommonTestingWtrMixin = (subclass) =>
  class extends subclass {
    async execute() {
      await super.execute();
      await this.copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };
