
import productContext from '../../context/product';
import { parseToMoney } from '../../helpers/functions';

class Card extends HTMLElement {
  product = null;

  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  connectedCallback() {
    this.product = {
      id: this.getAttribute('data-id') || '',
      type: this.getAttribute('data-type') || '',
      name: this.getAttribute('data-name') || '',
      description: this.getAttribute('data-description') || '',
      activeImage: this.getAttribute('data-active-image') || '',
      inactiveImage: this.getAttribute('data-inactive-image') || '',
      price: !!this.getAttribute('data-price') ? parseToMoney(this.getAttribute('data-price')) : parseToMoney(0.00)
    };

    this.render();
    this.addEventListener('click', this.toggleActive);
    document.addEventListener(this.product.type === 'broth' ? 'broth-changed' : 'protein-change', this.handleUpdate);
  }

  handleUpdate() {
    this.render();
  }

  disconnectedCallback() {
    this.product = null;
    this.removeEventListener('click', this.toggleActive);
  }

  toggleActive() {
    if (this.product.type === 'broth') {
      if (productContext.selectedBrothId !== this.product.id) {
        productContext.setSelectedBrothId(this.product.id);
      } else {
        productContext.setSelectedBrothId(null);
      }
    } else {
      if (productContext.selectedProteinId !== this.product.id) {
        productContext.setSelectedProteinId(this.product.id);
      } else {
        productContext.setSelectedProteinId(null);
      }
    }

    this.render();
  }

  render() {
    const selectedId = this.product.type === 'broth' ? productContext.selectedBrothId : productContext.selectedProteinId;
    const isActive = selectedId === this.product.id;

    this.innerHTML = `
      <style>
        .product-card {
          width: 350px;
          height: 350px;
          display: flex;
          padding: 15px;
          border-radius: 15px;
          align-items: center;
          border: 1px solid #ddd;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0px 4px 12px rgba(224, 219, 191, 0.6);
        }

        .product-card.active {
          background-color: var(--default-blue);
        }
        
        .product-card.active .product-card__title {
          color: var(--default-white);
        }

        .product-card.active .product-card__description {
          color: var(--default-white);
        }

        .product-card.active .product-card__price {
          color: var(--default-yellow);
        }

        .product-card__image {
          width: 50%;
          object-fit: contain;
        }

        .product-card__title {
          margin: 0;
          font-weight: 700;
          font-size: 1.5em;
          color: var(--default-blue);
        }

        .product-card__description {
          margin: 0;
          font-size: 1.2em;
          font-weight: 600;
          text-align: center;
        }

        .product-card__price {
          font-size: 1.2em;
          font-weight: 900;
          color: var(--default-red);
        }

      </style>
      <div class="product-card ${isActive ? 'active' : 'inactive'}">
        <img
          class="product-card__image"
          alt="${this.product.name}" 
          src="${productContext.selectedBrothId === this.product.id ? this.product.activeImage : this.product.inactiveImage}" 
        />
        <h2 class="product-card__title">${this.product.name}</h2>
        <p class="product-card__description">${this.product.description}</p>
        <span class="product-card__price">${this.product.price}</span>
      </div>
    `;
  }
}

customElements.define('product-card', Card);