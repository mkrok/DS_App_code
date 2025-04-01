const state = {
  _myPosition: { lat: 50.061667, lng: 19.937222, time: new Date().getTime() },
  _myDistance: 0,
  _myTrackCoordinates: [],
  _counter: 0,
  _startTime: new Date().getTime(),

  get myPosition() {
    return this._myPosition;
  },

  set myPosition(position) {
    this._myPosition = position;
  },

  get myDistance() {
    return this._myDistance;
  },

  set myDistance(distance) {
    this._myDistance = distance;
  },

  get myTrackCoordinates() {
    return this._myTrackCoordinates;
  },

  set myTrackCoordinates(coordinates) {
    this._myTrackCoordinates = coordinates;
  },

  get counter() {
    return this._counter;
  },

  set counter(counter) {
    this._counter = counter;
  },

  get startTime() {
    return this._startTime;
  },
};

export default state;
