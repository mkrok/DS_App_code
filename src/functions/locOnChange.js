import GPS from '../data/gps.js';

const locOnChange = data => {
  GPS.updatePosition(data);
  window.map.setCenter(data.latitude, data.longitude);
};

export default locOnChange;
