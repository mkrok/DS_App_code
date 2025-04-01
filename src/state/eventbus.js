export default {
  addEventListener(type, cb) {
    if (!this._listeners) {
      this._listeners = [];
    }

    let listener = { type: type, callback: cb };
    this._listeners.push(listener);
    return listener;
  },

  dispatchEvent(ce) {
    this._listeners.forEach(function (l) {
      if (ce.type === l.type) {
        l.callback.apply(this, [ce]);
      }
    });
  },
};
