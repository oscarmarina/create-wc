import prompts from 'prompts';
import {spawn} from 'child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import _Generator from '@open-wc/create/dist/Generator.js';
import {writeFilesToDisk} from '@open-wc/create/dist/core.js';

const isWindows = process.platform === 'win32';

/**
 * Normalizes cwd values to a valid absolute path.
 *
 * On Windows this also guards against a common ESM file-URL pitfall where
 * `.pathname` yields values like `/C:/Users/...` which can become `C:\\C:\\...`
 * after `path.resolve()`.
 *
 * @param {string | URL | undefined} maybePath
 */
function normalizeCwd(maybePath) {
  if (!maybePath || maybePath === 'auto') {
    return process.cwd();
  }

  /** @type {string} */
  let cwd;

  if (maybePath instanceof URL) {
    cwd = fileURLToPath(maybePath);
  } else if (typeof maybePath === 'string' && maybePath.startsWith('file:')) {
    cwd = fileURLToPath(new URL(maybePath));
  } else {
    cwd = String(maybePath);
  }

  if (isWindows) {
    // Fix paths like "/C:/Users/..." or "\\C:\\Users...".
    cwd = cwd.replace(/^[/\\]([A-Za-z]:[\\/])/, '$1');

    // Best-effort support for MSYS-style paths like "/c/Users/...".
    cwd = cwd.replace(/^\/([A-Za-z])\/(.*)/, (_, driveLetter, rest) => {
      const drive = String(driveLetter).toUpperCase();
      return `${drive}:\\${String(rest).replace(/\//g, '\\')}`;
    });
  }

  return path.resolve(cwd);
}

/**
 * Spawns a command in a way that works reliably on Windows.
 * - On Windows we run via cmd.exe (/c) to support .cmd/.bat shims (npm, pnpm, etc)
 * - We also normalize cwd when generator uses destinationPath='auto'
 *
 * @param {string} command
 * @param {string[]} args
 * @param {import('child_process').SpawnOptions} options
 */
function spawnCommand(command, args, options = {}) {
  const cwd = normalizeCwd(options.cwd);
  const spawnOptions = {
    ...options,
    cwd,
    stdio: 'inherit',
  };

  if (isWindows) {
    const comspec = process.env.comspec || 'cmd.exe';
    // Use windowsVerbatimArguments to prevent Node.js from escaping our already escaped command.
    // Wrap command and args in an extra set of quotes for cmd.exe /c
    const fullCommand = [command, ...args].join(' ');
    return spawn(comspec, ['/d', '/s', '/c', `"${fullCommand}"`], {
      ...spawnOptions,
      windowsVerbatimArguments: true,
    });
  }

  return spawn(command, args, spawnOptions);
}

/**
 * @param {string} command
 * @param {object} options
 */
/**
 * @param {string} command
 * @param {string[]} args
 * @param {object} options
 * @param {string} errorAction - description of action for error message
 */
function runTask(command, args, options, errorAction) {
  return new Promise((resolve, reject) => {
    let child;
    try {
      child = spawnCommand(command, args, options);
    } catch (error) {
      reject(error);
      return;
    }

    child.on('error', (error) => {
      const cwd = normalizeCwd(options.cwd);
      reject(new Error(`Failed to ${errorAction} in ${cwd}: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
      }
    });
  });
}

/**
 * @param {string} command
 * @param {object} options
 */
function _install(command = 'npm', options = {}) {
  return runTask(command, ['install'], options, `run ${command} install`);
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
 * @property {'true'|'false'} [writeToDisk] whether to disk
 * @property {'npm'|'pnpm'|'false'} [installDependencies] whether and with which tool to install dependencies
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

        await runTask(
          installDependencies,
          ['run', 'analyze'],
          {cwd: this.options.destinationPath},
          `run ${installDependencies} run analyze`
        );
      }
    }
  }
}

export default Generator;
