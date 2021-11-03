/* eslint-disable no-console */
import prompts from 'prompts';
import commandLineArgs from 'command-line-args';
import { executeMixinGenerator } from '@open-wc/create/dist/core.js';

import header from './header.js';
import { gatherMixins } from './gatherMixins.js';
import Generator from '../Generator.js';

/**
 * Allows to control the data via command line
 *
 * example:
 * npm init code-workshop-kit --type python --writeToDisk true
 */
const optionDefinitions = [
  { name: 'destinationPath', type: String },
  { name: 'type', type: String },
  { name: 'tagName', type: String },
  { name: 'writeToDisk', type: String },
];
const overrides = commandLineArgs(optionDefinitions);
prompts.override(overrides);

export const AppMixin = (subclass) =>
  // eslint-disable-next-line no-shadow
  class AppMixin extends subclass {
    constructor() {
      super();
      this.wantsNpmInstall = false;
      this.wantsWriteToDisk = false;
      this.wantsRecreateInfo = false;
    }

    async execute() {
      console.log(header);
      const questions = [
        {
          type: 'text',
          name: 'tagName',
          message: 'What is the tag name of your web component',
          typeLabel: '{underline string}',
          validate: (tagName) =>
            !/^([a-z])(?!.*[<>])(?=.*-).+$/.test(tagName)
              ? 'You need a minimum of two lowercase words separated by dashes (e.g. foo-bar)'
              : true,
        },
      ];

      this.options = await prompts(questions, {
        onCancel: () => {
          process.exit();
        },
      });

      // simulate prompts open-wc,
      this.options.type = 'scaffold';

      const mixins = gatherMixins(this.options);
      // app is separate to prevent circular imports
      await executeMixinGenerator(mixins, this.options, Generator);
    }
  };

export default AppMixin;
