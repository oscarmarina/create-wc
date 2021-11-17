/* eslint-disable no-console, import/no-cycle */
import _Generator from '@open-wc/create/dist/Generator.js';

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
}

export default Generator;
