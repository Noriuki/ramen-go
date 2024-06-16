class OrderCard extends HTMLElement {
  order = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.order = {
      id: this.getAttribute('data-id') || '',
      image: this.getAttribute('data-image') || '',
      description: this.getAttribute('data-description') || '',
    };
    this.render();
  }

  disconnectedCallback() {
    this.order = null;
  }

  render() {
    this.innerHTML = `
      <style>
        .order-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-image: url(${require('../../assets/images/blue-pattern.png')});
        }

        .order-card__image {
          width: 50%;
          max-width: 600px;
          object-fit: contain;
        }

        .order-card__body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 20px;
          row-gap: 20px;
        }

        .order-card__title {
          margin: 0;
          font-weight: 800;
          font-size: 1.2em;
          color: var(--default-white);
        }

        .order-card__description {
          margin: 0;
          font-size: 1.5em;
          font-weight: 800;
          text-align: center;
          color: var(--default-yellow);
        }

      </style>
      <div class="order-card">
        <img
          class="order-card__image"
          src="${this.order.image}" 
          alt="${this.order.description}" 
        />
        <div class="order-card__body">
          <h2 class="order-card__title">Your Order:</h2>
          <p class="order-card__description">${this.order.description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('order-card', OrderCard);