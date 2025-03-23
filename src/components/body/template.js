export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
      <div>
        <mk-button></mk-button>
      </div>
    `;
  },

  css(p) {
    return `
      <style>

        div {
          height: calc(100vh - 2em);
          border-bottom: solid 1px #aaa;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1em;
        }

      </style>`;
  },
};
