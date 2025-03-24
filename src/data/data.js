export default {
  _myPosition: { lat: 0, lng: 0 },

  get myPosition() {
    return this._myPosition;
  },

  set myPosition(position) {
    this._myPosition = position;
  },
};
