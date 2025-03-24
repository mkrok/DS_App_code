import GPS from '../data/gps.js';

const locOnChange = data => {
  GPS.updatePosition(data);
};

export default locOnChange;
