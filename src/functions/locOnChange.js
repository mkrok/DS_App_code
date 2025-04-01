import GPS from '../state/gps.js';
import state from '../state/state.js';

const locOnChange = data => {
  const myNewPosition = { lat: data.latitude, lng: data.longitude };
  const newLatLng = new google.maps.LatLng(data.latitude, data.longitude);
  const distanceChunk = loc.GetDistanceTo(data.latitude, data.longitude);
  const distance = state.myDistance;
  map.setCenter(myNewPosition);
  myTrackCoordinates.push(newLatLng);
  marker.setPosition(newLatLng);
  GPS.updateDistance(distance + distanceChunk);
  GPS.updatePosition(data);
  GPS.updateTrackCoordinates(myTrackCoordinates);
};

export default locOnChange;
