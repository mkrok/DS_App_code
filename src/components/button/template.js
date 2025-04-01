import play from '../../icons/play';

export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `
        <button>${play(p.color)}</button>
      `;
  },

  css(p) {
    return `<style>
      
      button {
        background-color: #555;
        margin: 2rem;
        border: #555;
        height: 50px;
      }

      svg { 
        height: 50px;
        width: 50px;
      }

    </style>`;
  },
};
