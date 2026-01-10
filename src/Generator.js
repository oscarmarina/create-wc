import prompts from 'prompts';
import {spawn} from 'child_process';
import _Generator from '@open-wc/create/dist/Generator.js';
import {writeFilesToDisk} from '@open-wc/create/dist/core.js';

const isWindows = process.platform === 'win32';

/**
 * @param {string} command
 * @param {object} options
 */
function _install(command = 'npm', options = {}) {
  return new Promise((resolve, reject) => {
    const cmdCommand = isWindows ? `${command}.cmd` : command;

    const install = spawn(cmdCommand, ['install'], {
      ...options,
      stdio: 'inherit',
    });

    install.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} install failed with code ${code}`));
    });
  });
}

/**
 *
 * @param {string} where
 * @param {string} command
 */
export async function installNpm(where, command) {
  console.log('');
  console.log('Installing dependencies...');
  console.log(`Using ${command} to install...`);
  await _install(command, {cwd: where});
  console.log('');
}

/**
 * Options for the generator
 * @typedef {object} GeneratorOptions
 * @property {string} [tagName] the dash-case tag name
 * @property {string} [destinationPath='auto'] path to output to. default value 'auto' will output to current working directory
 * @property {'scaffold'} [type='scaffold'] path to output to. default value 'auto' will output to current working directory
 * @property {'true'|'false'} [writeToDisk] whether to write to disk
 * @property {'yarn'|'npm'|'false'} [installDependencies] whether and with which tool to install dependencies
 */
class Generator extends _Generator.default {
  constructor() {
    super();
    this.wantsRecreateInfo = false;
    this.generatorName = '@blockquote/wc';
  }
  async end() {
    if (this.wantsWriteToDisk) {
      this.options.writeToDisk = await writeFilesToDisk();
    }

    if (this.wantsNpmInstall) {
      const answers = await prompts(
        [
          {
            type: 'select',
            name: 'installDependencies',
            message: 'Do you want to install dependencies?',
            choices: [
              {title: 'No', value: 'false'},
              {title: 'Yes, with npm', value: 'npm'},
              {title: 'Yes, with pnpm', value: 'pnpm'},
            ],
          },
        ],
        {
          onCancel: () => {
            process.exit();
          },
        }
      );

      this.options.installDependencies = answers.installDependencies;
      const {installDependencies} = this.options;
      if (installDependencies === 'pnpm' || installDependencies === 'npm') {
        await installNpm(this.options.destinationPath, installDependencies);

        await new Promise((resolve, reject) => {
          const cmdInstallDependencies = isWindows
            ? `${installDependencies}.cmd`
            : installDependencies;

          const install = spawn(cmdInstallDependencies, ['run', 'analyze'], {
            cwd: this.options.destinationPath,
            stdio: 'inherit',
          });

          install.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`${installDependencies} run analyze failed`));
          });
        });
      }
    }
  }
}

export default Generator;
