import { html, LitElement } from 'lit';
import styles from './styles/<%= className %>-styles.js';

export class <%= className %> extends LitElement {
  static get is() {
    return '<%= tagName %>';
  }

  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      /**
       * The heading to say "Hello" to.
       * @type {string}
       */
      heading: { type: String },

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.heading = 'Hey there';
    this.counter = 5;
  }

  render() {
    return html`
      <h1>${this.sayHello(this.heading)}!</h1>
      <button @click=${this._onClick}>Counter: ${this.counter}</button>
      <hr />
      <slot></slot>
    `;
  }

  _onClick() {
    this.counter += 1;
    this.dispatchEvent(new CustomEvent('counter-changed'));
  }

  /**
   * Formats a greeting
   * @param heading {string} The heading to say "Hello" to
   * @returns {string} A greeting directed at `heading`
   */
  sayHello(heading) {
    return `Hello, ${heading}`;
  }
}
