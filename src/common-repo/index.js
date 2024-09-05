import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CommonRepoMixin = (subclass) =>
  class extends subclass {
    async execute() {
      this.templateData = {
        ...this.templateData,
        scriptRunCommand: this.options.installDependencies === 'yarn' ? 'yarn' : 'npm run',
        year: new Date().getFullYear(),
        nameSpace: this.options.nameSpace ? `@${this.options.nameSpace}/` : '',
      };

      await super.execute();
      const {tagName} = this.templateData;

      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json')
      );

      // write & rename el scss template
      this.copyTemplate(
        `${__dirname}/templates/styles/my-el.scss`,
        this.destinationPath(`src/styles/${tagName}.scss`)
      );

      // write and rename .gitignore
      this.copyTemplate(`${__dirname}/templates/gitignore`, this.destinationPath(`.gitignore`));

      // write and rename .prettierignore
      this.copyTemplate(
        `${__dirname}/templates/prettierignore`,
        this.destinationPath(`.prettierignore`)
      );

      this.copyTemplate(
        `${__dirname}/templates/eslint.config.js`,
        this.destinationPath(`eslint.config.js`)
      );

      // copy all other files
      await this.copyTemplates(`${__dirname}/templates/static/**/*`);
    }

    async end() {
      await super.end();

      const {destinationPath} = this.options;

      if (destinationPath) {
        const huskyPreCommit = path.join(this.options.destinationPath, '.husky/pre-commit');
        try {
          fs.chmodSync(huskyPreCommit, 0o755);
        } catch (err) {
          if (err.code !== 'ENOENT') {
            throw err;
          }
        }
      }
    }
  };
