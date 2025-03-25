export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
      <div>
        <mk-header></mk-header>
        <div id="map"></div>
        <mk-body></mk-body>
      </div>
    `;
  },

  css(p) {
    return `
      <style>
        div {
          background-color: ${p.bgColor};
          color: ${p.color};
          font-family: sans-serif;
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          max-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      </style>`;
  },
};
