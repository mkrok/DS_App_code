import Template from './template.js';

class MkApp extends HTMLElement {
  connectedCallback() {
    const params = {
      bgColor: '#555',
      color: 'white',
    };
    this.innerHTML = Template.render(params);
  }
}

if (!customElements.get('mk-app')) {
  customElements.define('mk-app', MkApp);
}

export default MkApp;
