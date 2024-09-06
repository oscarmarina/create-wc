import {html, fixture, assert, expect, fixtureCleanup} from '@open-wc/testing';
import {<%= className %>} from '../src/<%= className %>.js';
import '../define/<%= tagName %>.js';

suite('<%= className %>', () => {
  let el: <%= className %>;

  teardown(() => fixtureCleanup());

  suite('Default', () => {
    setup(async () => {
      el = await fixture(html`<<%= tagName %>>light-dom</<%= tagName %>>`);
    });

    test('has a default heading "Hey there" and counter 5', () => {
      assert.equal(el.heading, 'Hey there');
      assert.equal(el.counter, 5);
    });

    suite('Semantic Dom and a11y', () => {
      test('SHADOW DOM - Structure test', async () => {
        await expect(el).shadowDom.to.equalSnapshot();
      });

      test('LIGHT DOM - Structure test', async () => {
        await expect(el).lightDom.to.equalSnapshot();
      });

      test('a11y', async () => {
        await assert.isAccessible(el);
      });
    });
  });

  suite('Events ', () => {
    setup(async () => {
      el = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
    });

    test('increases the counter on button click', () => {
      const button = el.shadowRoot!.querySelector('button')!;
      button.click();
      assert.equal(el.counter, 6);
    });
  });

  suite('Override ', () => {
    setup(async () => {
      el = await fixture(html`<<%= tagName %> heading="attribute heading"></<%= tagName %>>`);
    });

    test('can override the heading via attribute', () => {
      assert.equal(el.heading, 'attribute heading');
    });
  });
});
