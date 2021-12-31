import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
      const { className } = this.templateData;

      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json'),
      );

      // write & rename el scss template
      this.copyTemplate(
        `${__dirname}/templates/styles/MyEl.scss`,
        this.destinationPath(`src/styles/${className}.scss`),
      );

      // write and rename .gitignore
      this.copyTemplate(`${__dirname}/templates/gitignore`, this.destinationPath(`.gitignore`));

      // write and rename .gitignore
      this.copyTemplate(`${__dirname}/templates/eslintignore`, this.destinationPath(`.eslintignore`));

      // copy all other files
      await this.copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };
