// js
import {CommonLintingMixin} from '../common-linting/index.js';
import {CommonTestingWtrMixin} from '../common-testing-wtr/index.js';

import {WcLitElementPackageMixin} from '../wc-lit-element/index.js';
import {TestingMixin, TestingScaffoldMixin} from '../testing/index.js';

// ts
import {TsWcLitElementPackageMixin} from '../wc-lit-element-ts/index.js';
import {TsTestingMixin, TsTestingScaffoldMixin} from '../testing-ts/index.js';

export function gatherMixins(options) {
  const mixins = [];
  if (options.typescript === 'true') {
    mixins.push(CommonLintingMixin);
    mixins.push(CommonTestingWtrMixin);
    mixins.push(TsTestingMixin);
    mixins.push(TsTestingScaffoldMixin);
    mixins.push(TsWcLitElementPackageMixin);
  } else {
    mixins.push(CommonLintingMixin);
    mixins.push(CommonTestingWtrMixin);
    mixins.push(TestingMixin);
    mixins.push(TestingScaffoldMixin);
    mixins.push(WcLitElementPackageMixin);
  }

  return mixins;
}
