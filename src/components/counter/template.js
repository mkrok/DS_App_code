export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
      <div>
        <p>Counter: ${p.time}</p>
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
        }

        p {
          font-size: 1.5em;
        }

      </style>`;
  },
};
