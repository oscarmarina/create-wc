import {beforeAll, afterAll, beforeEach, afterEach, suite, assert, expect, vi, test} from 'vitest';
import {getElementLocatorSelectors} from '@vitest/browser/utils';
import {html} from 'lit';
import {getDiffableHTML} from '@open-wc/semantic-dom-diff';
import {assert as a11y, fixture, fixtureCleanup} from '@open-wc/testing';
import '../src/define/<%= tagName %>.js';

suite('<%= className %>', () => {
  /**
   * @type {import('../src/index').<%= className %>}
   */
  let el;
  let elShadowRoot;
  let elLocator;

  suite('Semantic Dom and a11y', () => {
    beforeAll(async () => {
      el = await fixture(html`<<%= tagName %>>light-dom</<%= tagName %>>`);
      elShadowRoot = el?.shadowRoot?.innerHTML;
      elLocator = getElementLocatorSelectors(el);
    });

    afterAll(() => {
      fixtureCleanup();
    });

    test('has a default heading "Hey there" and counter 5', () => {
      const button = elLocator.getByText('Counter: 5').query();
      const heading = elLocator.getByText('Hey there').query();
      assert.isOk(button);
      assert.isOk(heading);
    });

    test('SHADOW DOM - Structure test', () => {
      expect(getDiffableHTML(elShadowRoot)).toMatchSnapshot('SHADOW DOM');
    });

    test('LIGHT DOM - Structure test', () => {
      expect(getDiffableHTML(el, {ignoreAttributes: ['id']})).toMatchSnapshot('LIGHT DOM');
    });

    test('a11y', async () => {
      await a11y.isAccessible(el);
    });
  });

  suite('Events ', () => {
    beforeEach(async () => {
      el = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
      elLocator = getElementLocatorSelectors(el);
    });

    afterEach(() => {
      fixtureCleanup();
    });

    test('should increment value on click', async () => {
      const button = elLocator.getByText('Counter: 5');
      const elButton = button.query();
      await button.dblClick();
      await el.updateComplete;
      assert.include(elButton.textContent, 'Counter: 7');
    });

    test('counterchange event is dispatched', async () => {
      const spyEvent = vi.spyOn(el, 'dispatchEvent');
      const button = elLocator.getByText('Counter: 5');
      await button.click();
      await el.updateComplete;
      const calledWithCounterChange = spyEvent.mock.lastCall?.[0].type === 'counterchange';
      assert.isTrue(calledWithCounterChange);
    });
  });

  suite('Override ', () => {
    beforeAll(async () => {
      el = await fixture(html`<<%= tagName %> heading="attribute heading"></<%= tagName %>>`);
      elLocator = getElementLocatorSelectors(el);

      return () => {
        fixtureCleanup();
      };
    });

    test('can override the heading via attribute', () => {
      assert.equal(el.heading, 'attribute heading');
    });
  });
});
