import Template from './template.js';
import EventBus from '../../state/eventbus.js';
import state from '../../state/state.js';
import GPS from '../../state/gps.js';

class MkDistance extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const params = {
      distance: state.myDistance,
    };

    EventBus.addEventListener(GPS.DISTANCE_UPDATE_EVENT, e => {
      params.distance = e.detail.myDistance;
      this.shadowRoot.innerHTML = Template.render(params);
    });

    this.shadowRoot.innerHTML = Template.render(params);
  }
}

if (!customElements.get('mk-distance')) {
  customElements.define('mk-distance', MkDistance);
}

export default MkDistance;
