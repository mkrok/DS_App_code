import Template from './template.js';
import EventBus from '../../state/eventbus.js';
import Timer from '../../state/timer.js';
import state from '../../state/state.js';

class MkCounter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const params = {
      time: state.counter,
    };

    EventBus.addEventListener(Timer.TIME_UPDATE_EVENT, e => {
      params.time = e.detail.time;
      this.shadowRoot.innerHTML = Template.render(params);
    });

    this.shadowRoot.innerHTML = Template.render(params);
  }
}

if (!customElements.get('mk-counter')) {
  customElements.define('mk-counter', MkCounter);
}

export default MkCounter;
