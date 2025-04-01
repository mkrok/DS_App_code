import msToTimeString from '../../functions/msToTimeString';

export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    const currentTime = new Date(p.myPosition.time).toLocaleTimeString();
    const startedTime = new Date(p.startTime).toLocaleTimeString();
    const time = msToTimeString(p.myPosition.time - p.startTime);
    return `
      <div>
        <mk-counter></mk-counter>
        <mk-distance></mk-distance>
        <mk-timer></mk-timer>
        <textarea rows="10" cols="40" wrap="hard">${JSON.stringify(p.myPosition)} - ${startedTime} - ${currentTime} ${
      time.hours
    }:${time.minutes}:${time.seconds} </textarea>
        <mk-button></mk-button>
      </div>
    `;
  },

  css(p) {
    return `
      <style>

        div {
          height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1em;
        }

      </style>`;
  },
};
