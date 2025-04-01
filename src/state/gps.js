import EventBus from './eventbus.js';
import state from './state.js';

export default {
  get POSITION_UPDATE_EVENT() {
    return 'onPositionUpdate';
  },

  get DISTANCE_UPDATE_EVENT() {
    return 'onDistanceUpdate';
  },

  get MY_TRACK_COORDINATES_UPDATE_EVENT() {
    return 'onMyTrackCoordinatesUpdate';
  },

  updatePosition(position) {
    state.myPosition = position;
    let ce = new CustomEvent(this.POSITION_UPDATE_EVENT, {
      detail: {
        myPosition: position,
      },
    });
    EventBus.dispatchEvent(ce);
  },

  updateDistance(distance) {
    state.myDistance = distance;
    let ce = new CustomEvent(this.DISTANCE_UPDATE_EVENT, {
      detail: {
        myDistance: distance,
      },
    });
    EventBus.dispatchEvent(ce);
  },

  updateTrackCoordinates(coordinate) {
    state.myTrackCoordinates = myTrackCoordinates;
    let ce = new CustomEvent(this.MY_TRACK_COORDINATES_UPDATE_EVENT, {
      detail: {
        myTrackCoordinates: state.myTrackCoordinates,
      },
    });
    EventBus.dispatchEvent(ce);
  },
};
