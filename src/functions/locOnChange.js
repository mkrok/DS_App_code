import GPS from '../data/gps.js';

const locOnChange = data => {
  GPS.updatePosition(data);
  map.setCenter({ lat: data.latitude, lng: data.longitude });
  const newLatLng = new google.maps.LatLng(data.latitude, data.longitude);
  myTrackCoordinates.push(newLatLng);
  marker.setPosition(newLatLng);
};

export default locOnChange;
