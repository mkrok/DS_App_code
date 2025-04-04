import Template from './template.js';
import EventBus from '../../state/eventbus.js';
import state from '../../state/state.js';
import GPS from '../../state/gps.js';

class MkBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const params = {
      myPosition: state.myPosition,
      startTime: state.startTime,
    };
    EventBus.addEventListener(GPS.POSITION_UPDATE_EVENT, e => {
      params.myPosition = e.detail.myPosition;
      this.shadowRoot.innerHTML = Template.render(params);
    });

    this.shadowRoot.innerHTML = Template.render(params);
  }
}

if (!customElements.get('mk-body')) {
  customElements.define('mk-body', MkBody);
}

export default MkBody;
