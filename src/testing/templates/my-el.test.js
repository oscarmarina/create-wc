import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';

import '../define/<%= tagName %>.js';

suite('<%= className %>', () => {
  let el;

  teardown(() => fixtureCleanup());

  suite('Default', () => {
    setup(async () => {
      el = await fixture(html` <<%= tagName %>></<%= tagName %>> `);
      await el.updateComplete;
    });

    test('has a default heading "Hey there" and counter 5', async () => {
      assert.equal(el.heading, 'Hey there');
      assert.equal(el.counter, 5);
    });

    suite('Semantic Dom and a11y', () => {
      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });
      test('a11y', async () => {
        await assert.isAccessible(el);
      });
    });
  });

  suite('Events ', () => {
    setup(async () => {
      el = await fixture(html` <<%= tagName %>></<%= tagName %>> `);
      await el.updateComplete;
    });

    test('increases the counter on button click', async () => {
      el.shadowRoot.querySelector('button').click();
      assert.equal(el.counter, 6);
    });
  });

  suite('Override ', () => {
    setup(async () => {
      el = await fixture(html` <<%= tagName %> heading="attribute heading"></<%= tagName %>> `);
      await el.updateComplete;
    });

    test('can override the heading via attribute', async () => {
      assert.equal(el.heading, 'attribute heading');
    });
  });
});
