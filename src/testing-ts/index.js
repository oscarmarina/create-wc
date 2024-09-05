/* eslint-disable max-classes-per-file */
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {TsTestingWebTestRunnerMixin} from '../testing-wtr-ts/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TsTestingMixin = (subclass) =>
  class extends TsTestingWebTestRunnerMixin(subclass) {
    async execute() {
      await super.execute();

      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json')
      );
    }
  };

export const TsTestingScaffoldMixin = (subclass) =>
  class extends subclass {
    async execute() {
      await super.execute();

      const {tagName} = this.templateData;
      this.copyTemplate(
        `${__dirname}/templates/my-el.test.ts`,
        this.destinationPath(`test/${tagName}.test.ts`)
      );
    }
  };
