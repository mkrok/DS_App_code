import Template from './template.js';
import EventBus from '../../data/eventbus.js';
import Timer from '../../data/timer.js';
import Data from '../../data/data.js';
import GPS from '../../data/gps.js';
class MkBody extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const params = {
      myPosition: Data.myPosition,
      time: 0,
    };

    EventBus.addEventListener(Timer.TIME_UPDATE_EVENT, e => {
      params.time = e.detail.time;
      this.shadowRoot.innerHTML = Template.render(params);
    });

    EventBus.addEventListener(GPS.POSITION_UPDATE_EVENT, e => {
      params.myPosition = e.detail.myPosition;
      this.shadowRoot.innerHTML = Template.render(params);
    });

    this.shadowRoot.innerHTML = Template.render(params);
    Timer.play();
  }
}

if (!customElements.get('mk-body')) {
  customElements.define('mk-body', MkBody);
}

export default MkBody;
