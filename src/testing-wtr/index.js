import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TestingWebTestRunnerMixin = (subclass) =>
  class extends subclass {
    async execute() {
      await super.execute();

      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json')
      );

      // await this.copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };
