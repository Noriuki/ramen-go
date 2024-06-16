import '../product-card';

class ProductCarousel extends HTMLElement {
  currentSlide = 0;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    window.addEventListener('resize', this.render);
    this.addEventListener('click', this.handleIndicatorClick);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.render);
    this.removeEventListener('click', this.handleIndicatorClick);
  }

  handleIndicatorClick = (event) => {
    if (event.target.dataset.slideIndex) {
      this.currentSlide = parseInt(event.target.dataset.slideIndex);
      this.render();
    }
  };

  render() {
    const title = this.getAttribute('data-title') || '';
    const productType = this.getAttribute('data-type') || '';
    const subTitle = this.getAttribute('data-subtitle') || '';
    const products = this.getAttribute('data-products') ? JSON.parse(this.getAttribute('data-products')) : [];

    const windowWidth = window.innerWidth;

    let slidesToShow = 1;

    if (windowWidth >= 1024) {
      slidesToShow = 3;
    }

    const visibleProducts = products.slice(this.currentSlide, this.currentSlide + slidesToShow);

    this.innerHTML = `
      <style>
        .carousel-container {
          margin: 20px 0;
          width: 100%;
          height: 100%;
          display: flex;
          padding: 5px;
          row-gap: 20px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .carousel-title-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          row-gap: 5px;
        }

        .carousel-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .carousel-subtitle {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
        }

        .carousel {
          flex: 1;
          width: 100%;
          display: flex;
          column-gap: 10px;
          overflow-x: auto;
          align-items: center;
          justify-content: space-between;
          scroll-snap-type: x mandatory;
        }

        .indicators {
          display: flex;
          margin-top: 10px;
          justify-content: center;
        }

        .indicator {
          width: 10px;
          height: 10px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 50%;
          background-color: gray;
        }

        .indicator.active {
          width: 32px;
          border-radius: 5px;
          background-color: var(--default-red);
        }

        product-card {
          margin: auto;
          cursor: pointer;
        }
      
        @media (min-width: 768px) {
          .carousel-title {
            font-size: 2rem;
          }

          .carousel-subtitle {
            font-size: 1.5rem;
          }
        }
      </style>
      <div class="carousel-container">
        <div class="carousel-title-container">
          <h1 class="carousel-title">${title}</h1>
          <p class="carousel-subtitle">${subTitle}</p>
        </div>
        <div class="carousel">
          ${visibleProducts.map((product) => `
            <product-card
              data-id="${product.id}"
              data-type="${productType}"
              data-name="${product.name}"
              data-price="${product.price}"
              data-active-image="${product.imageActive}"
              data-inactive-image="${product.imageInactive}"
              data-description="${product.description}"
            >
            </product-card>
          `).join('')}
        </div>
        ${products.length > slidesToShow ? `
          <div class="indicators">
            ${products.map((_, index) => `
              <div class="indicator ${index === this.currentSlide ? 'active' : ''}" data-slide-index="${index}"></div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('product-carousel', ProductCarousel);