import Template from './template.js';

class MkBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const params = {};
    this.shadowRoot.innerHTML = Template.render(params);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(val) {
    this.setAttribute('label', val);
  }
}

if (!customElements.get('mk-body')) {
  customElements.define('mk-body', MkBody);
}

export default MkBody;
