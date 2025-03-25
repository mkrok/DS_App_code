import Template from './template.js';

class MkMap extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = Template.render({});
    let map;

    async function initMap() {
      const { Map } = await google.maps.importLibrary('maps');

      map = new Map(root, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }

    initMap();
  }
}

if (!customElements.get('mk-map')) {
  customElements.define('mk-map', MkMap);
}

export default MkMap;
