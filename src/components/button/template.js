export default {
  render(props) {
    return `${this.html(props)}
            ${this.css(props)}`;
  },

  html(p) {
    return `<button>${p.title}</button>`;
  },

  css(p) {
    return `<style>
      button {
        background-color: ${p.color || '#444'};
        color: white;
        padding: 0.5rem;
        font-size: ${p.size === 'large' ? '2em' : '1em'};
        font-weight: normal;
        margin: 10px;
        border-radius: 0.25rem;
        border: 1px solid ${p.color || '#444'};
      }
    </style>`;
  },
};
