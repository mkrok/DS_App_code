export default {
  _myPosition: { lat: 50.061667, lng: 19.937222 },

  get myPosition() {
    return this._myPosition;
  },

  set myPosition(position) {
    this._myPosition = position;
  },
};
