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
      };

      await super.execute();

      this.copyTemplateJsonInto(
        `${__dirname}/templates/package.json`,
        this.destinationPath('package.json'),
      );

      // write and rename .gitignore
      this.copyTemplate(`${__dirname}/templates/gitignore`, this.destinationPath(`.gitignore`));

      // copy all other files
      await this.copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };
