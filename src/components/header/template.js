export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
      <div>
        <p>Runner</p>
      </div>
    `;
  },

  css(p) {
    return `
      <style>

        div {
          height: 2em;
          border-bottom: solid 1px #aaa;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 2em;
          padding: 1px;
        }

      </style>`;
  },
};
