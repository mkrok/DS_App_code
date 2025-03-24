import EventBus from './eventbus.js';

export default {
  get TIME_UPDATE_EVENT() {
    return 'onTimeUpdate';
  },

  play() {
    if (!this._seconds) {
      this._seconds = 0;
    }
    this._timer = setInterval(() => {
      this._seconds++;
      this.updateTime(this._seconds);
    }, 1000);
  },

  stop() {
    this._seconds = 0;
    clearInterval(this._timer);

    let ce = new CustomEvent(this.TIME_UPDATE_EVENT, {
      detail: {
        time: 0,
      },
    });
    EventBus.dispatchEvent(ce);
  },

  pause() {
    clearInterval(this._timer);
  },

  updateTime(seconds) {
    let ce = new CustomEvent(this.TIME_UPDATE_EVENT, {
      detail: {
        time: seconds,
      },
    });
    EventBus.dispatchEvent(ce);
  },
};
