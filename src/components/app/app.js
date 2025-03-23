import Template from './template.js';

class MkApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const params = {
      bgColor: '#555',
      color: 'white',
    };
    this.shadowRoot.innerHTML = Template.render(params);
  }
}

if (!customElements.get('mk-app')) {
  customElements.define('mk-app', MkApp);
}

export default MkApp;
