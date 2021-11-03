/* eslint-disable no-console, import/no-cycle */
import _Generator from '@open-wc/create/dist/Generator.js';

/**
 * Options for the generator
 * @typedef {object} GeneratorOptions
 * @property {string} [name] the workshop name
 * @property {string} [destinationPath='auto'] path to output to. default value 'auto' will output to current working directory
 * @property {'true'|'false'} [writeToDisk] whether to write to disk
 */

class Generator extends _Generator.default {
  constructor() {
    super();
    this.wantsRecreateInfo = false;
    this.generatorName = '@blockquote/wc';
  }
}

export default Generator;
