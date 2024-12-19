// js
import {CommonLintingMixin} from '../common-linting/index.js';
import {WcLitElementPackageMixin} from '../wc-lit-element/index.js';
import {TestingScaffoldMixin /* TestingMixin */} from '../testing/index.js';

// ts
import {TsWcLitElementPackageMixin} from '../wc-lit-element-ts/index.js';
import {TsTestingScaffoldMixin /* TsTestingMixin */} from '../testing-ts/index.js';

export function gatherMixins(options) {
  const mixins = [];
  if (options.typescript === 'true') {
    mixins.push(CommonLintingMixin);
    mixins.push(TsTestingScaffoldMixin);
    mixins.push(TsWcLitElementPackageMixin);
  } else {
    mixins.push(CommonLintingMixin);
    mixins.push(TestingScaffoldMixin);
    mixins.push(WcLitElementPackageMixin);
  }

  return mixins;
}
