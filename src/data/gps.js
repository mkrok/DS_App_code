import EventBus from './eventbus.js';
import Data from './data.js';

export default {
  get POSITION_UPDATE_EVENT() {
    return 'onPositionUpdate';
  },

  updatePosition(position) {
    Data.myPosition = position;
    let ce = new CustomEvent(this.POSITION_UPDATE_EVENT, {
      detail: {
        myPosition: position,
      },
    });
    EventBus.dispatchEvent(ce);
  },
};
