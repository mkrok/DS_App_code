import msToTimeString from '../../functions/msToTimeString';

export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    const time = msToTimeString(p.myPosition.time - p.startTime);
    return `
       <div>
        <p>Time: ${time.hours}:${time.minutes}:${time.seconds}</p>
      </div>
    `;
  },

  css(p) {
    return `
      <style>

        div {
          height: 50px;
          width: 90vw;
          border-bottom: solid 1px #aaa;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 1em;
          margin-bottom: 1em;
        }

        p {
          font-size: 1.5em;
        }

      </style>`;
  },
};
