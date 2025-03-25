export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
      <div>
        <p>${p.time}</p>
        <textarea rows="10" cols="30" wrap="hard">${JSON.stringify(p.myPosition)}</textarea>
        <mk-button></mk-button>
      </div>
    `;
  },

  css(p) {
    return `
      <style>

        div {
          height: 100%;
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
