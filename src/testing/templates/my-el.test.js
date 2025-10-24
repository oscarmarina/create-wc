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
  let elShadowRoot;
  let elLocator;

  describe('Semantic Dom and a11y', () => {
    beforeAll(async () => {
      el = await fixture(html`<<%= tagName %>>light-dom</<%= tagName %>>`);
      elShadowRoot = el?.shadowRoot?.innerHTML;
      elLocator = utils.getElementLocatorSelectors(el);
    });

    afterAll(() => {
      fixtureCleanup();
    });

    it('has a default heading "Hey there" and counter 5', () => {
      const button = elLocator.getByText('Counter: 5').query();
      const heading = elLocator.getByText('Hey there').query();
      expect(button).toBeTruthy();
      expect(heading).toBeTruthy();
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
      const button = elLocator.getByText('Counter: 5');
      const elButton = button.query();
      await button.dblClick();
      await el.updateComplete;
      expect(elButton.textContent).toContain('Counter: 7');
    });

    it('counterchange event is dispatched - vi', async () => {
      const spyEvent = vi.spyOn(el, 'dispatchEvent');
      const button = elLocator.getByText('Counter: 5');
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
