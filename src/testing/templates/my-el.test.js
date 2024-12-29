import {beforeAll, afterAll, beforeEach, afterEach, suite, assert, expect, vi, test} from 'vitest';
import {page, userEvent} from '@vitest/browser/context';
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
      elLocator = page.elementLocator(el);
    });

    afterAll(() => {
      fixtureCleanup();
    });

    test('has a default heading "Hey there" and counter 5', async () => {
      const button = await elLocator.getByText('Counter: 5').query();
      const heading = await elLocator.getByText('Hey there').query();
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
      elLocator = page.elementLocator(el);
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
      const elButton = button.query();
      await userEvent.click(elButton);
      await el.updateComplete;
      const calledWithCounterChange = spyEvent.mock.lastCall?.[0].type === 'counterchange';
      assert.isTrue(calledWithCounterChange);
    });
  });

  suite('Override ', () => {
    beforeAll(async () => {
      el = await fixture(html`<<%= tagName %> heading="attribute heading"></<%= tagName %>>`);
      elLocator = page.elementLocator(el);

      return () => {
        fixtureCleanup();
      };
    });

    test('can override the heading via attribute', () => {
      assert.equal(el.heading, 'attribute heading');
    });
  });
});
