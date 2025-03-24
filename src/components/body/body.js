import Template from './template.js';
import EventBus from '../../data/eventbus.js';
import Timer from '../../data/timer.js';

class MkBody extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const params = {
      myPosition: window.myPosition,
      time: 0,
    };

    EventBus.addEventListener(Timer.TIME_UPDATE_EVENT, e => {
      params.time = e.detail.time;
      this.shadowRoot.innerHTML = Template.render(params);
    });

    this.shadowRoot.innerHTML = Template.render(params);
    Timer.play();
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
