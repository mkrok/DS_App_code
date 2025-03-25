export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
      <div id="map"></div>
    `;
  },

  css(p) {
    return `
      <style>

        div {
          height: 50vh;
          width: 100vw;
          background-color: 'red';
        }

      </style>`;
  },
};
