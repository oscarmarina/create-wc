/* eslint-disable max-classes-per-file */
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TestingMixin = (subclass) =>
  class extends subclass {
    async execute() {
      await super.execute();
      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json')
      );
    }
  };

export const TestingScaffoldMixin = (subclass) =>
  class extends subclass {
    async execute() {
      await super.execute();

      const {tagName} = this.templateData;
      this.copyTemplate(
        `${__dirname}/templates/my-el.test.js`,
        this.destinationPath(`test/${tagName}.test.js`)
      );
    }
  };
