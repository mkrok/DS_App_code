import Template from './template.js';
class MkButton extends HTMLElement {
  constructor() {
    super();

    let params = {
      color: 'red',
    };

    const onclick = () => {
      console.log(params.color);
      if (params.color === 'red') {
        params.color = 'green';
      } else {
        params.color = 'red';
      }
      this.shadowRoot.innerHTML = Template.render(params);
    };

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = Template.render(params);
    this.addEventListener('click', onclick);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(val) {
    params.color = val;
    this.shadowRoot.innerHTML = Template.render(params);
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }
}

if (!customElements.get('mk-button')) {
  customElements.define('mk-button', MkButton);
}

export default MkButton;
