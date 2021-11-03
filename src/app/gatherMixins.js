import { LintingMixin } from '@open-wc/create/dist/generators/linting/index.js';
import { WcLitElementMixin, WcLitElementPackageMixin } from '../wc-lit-element/index.js';
import { TestingMixin, TestingScaffoldMixin } from '../testing/index.js';

// import { LintingMixin } from '../linting/index.js';

export function gatherMixins(options) {
  const mixins = [];
  switch (options.type) {
    case 'scaffold':
      mixins.push(LintingMixin);
      mixins.push(TestingMixin);
      mixins.push(TestingScaffoldMixin);
      mixins.push(WcLitElementPackageMixin);
      mixins.push(WcLitElementMixin);
      break;
    // no default
  }
  return mixins;
}
