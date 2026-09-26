import {describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi, chai} from 'vitest';
import {utils} from 'vitest/browser';
import {fixture, fixtureCleanup} from '@open-wc/testing-helpers';
import {chaiA11yAxe} from 'chai-a11y-axe';
import {getDiffableHTML} from '@open-wc/semantic-dom-diff/get-diffable-html.js';
import {html} from 'lit';
import '../src/define/<%= tagName %>.js';

chai.use(chaiA11yAxe);

describe('<%= className %>', () => {
  /**
   * @type {import('../src/index').<%= className %>}
   */
  let el;

  /** @type {string} */
  let elShadowRoot;

  /** @type {ReturnType<typeof utils.getElementLocatorSelectors>} */
  let elLocator;

  describe('Semantic Dom and a11y', () => {
    beforeAll(async () => {
      el = await fixture(html`<<%= tagName %>>light-dom</<%= tagName %>>`);
      elShadowRoot = el?.shadowRoot?.innerHTML ?? '';
      elLocator = utils.getElementLocatorSelectors(el);
    });

    afterAll(() => {
      fixtureCleanup();
    });

    it('has a default heading "Hey there" and counter 5', async () => {
      const heading = elLocator.getByRole('heading', {
        level: 1,
        name: 'Hello, Hey there!',
      });
      const button = elLocator.getByRole('button', {
        name: 'Counter: 5',
      });

      await expect.element(heading).toHaveAccessibleName('Hello, Hey there!');
      await expect.element(button).toHaveAccessibleName('Counter: 5');
    });

    it('SHADOW DOM - Structure test', () => {
      expect(getDiffableHTML(elShadowRoot)).toMatchSnapshot('SHADOW DOM');
    });

    it('LIGHT DOM - Structure test', () => {
      expect(getDiffableHTML(el, {ignoreAttributes: ['id']})).toMatchSnapshot('LIGHT DOM');
    });

    it('a11y', async () => {
      await expect(el).accessible();
    });
  });

  describe('Events ', () => {
    beforeEach(async () => {
      el = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
      elLocator = utils.getElementLocatorSelectors(el);
    });

    afterEach(() => {
      fixtureCleanup();
    });

    it('should increment value on click', async () => {
      const button = elLocator.getByRole('button');
      await expect.element(button).toHaveAccessibleName('Counter: 5');
      await button.dblClick();
      await expect.element(button).toHaveAccessibleName('Counter: 7');
    });

    it('counterchange event is dispatched - vi', async () => {
      const spyEvent = vi.spyOn(el, 'dispatchEvent');
      const button = elLocator.getByRole('button', {name: 'Counter: 5', exact: true});
      await button.click();
      expect(spyEvent).toHaveBeenCalledWith(expect.objectContaining({type: 'counterchange'}));
    });
  });

  describe('Override ', () => {
    beforeAll(async () => {
      el = await fixture(html`<<%= tagName %> heading="attribute heading"></<%= tagName %>>`);
      elLocator = utils.getElementLocatorSelectors(el);

      return () => {
        fixtureCleanup();
      };
    });

    it('can override the heading via attribute', () => {
      expect(el.heading).toBe('attribute heading');
    });
  });
});
