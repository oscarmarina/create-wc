#!/usr/bin/env node

/* eslint-disable no-console */

import semver from 'semver';
import chalk from 'chalk';
import {executeMixinGenerator} from '@open-wc/create/dist/core.js';
import Generator from './Generator.js';
import {AppMixin} from './app/index.js';

(async () => {
  try {
    if (semver.satisfies(process.version, '>=14.15.0')) {
      await executeMixinGenerator([AppMixin], {}, Generator);
    } else {
      console.log(
        chalk.bgRed('\nUh oh! Looks like you dont have Node v14.15.0 or higher installed!\n')
      );
      console.log(`You can do this by going to ${chalk.underline.blue(`https://nodejs.org/`)}

Or if you use nvm:
  $ nvm install node ${chalk.gray(`# "node" is an alias for the latest version`)}
  $ nvm use node
`);
    }
  } catch (err) {
    console.log(err);
  }
})();
