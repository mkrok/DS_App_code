import Template from './template.js';
import state from '../../state/state.js';

class MkTimer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const params = {
      myPosition: state.myPosition,
      startTime: state.startTime,
    };

    this.shadowRoot.innerHTML = Template.render(params);
  }
}

if (!customElements.get('mk-timer')) {
  customElements.define('mk-timer', MkTimer);
}

export default MkTimer;
