import { renderPage } from '../../app.js';
import '../../components/product-card';
import '../../components/product-carousel';
import orderContext from '../../context/order';
import productContext from '../../context/product';
import apiService from '../../services/api';

export default async function Home() {
  const element = document.createElement('main');

  element.classList.add('page-container');
  element.innerHTML = "";

  const brothCarousel = await renderBrothCarousel();
  brothCarousel.style.width = '100%';
  // brothCarousel.style.height = '45vh';

  const proteinCarousel = await renderProteinCarousel();
  proteinCarousel.style.width = '100%';
  // proteinCarousel.style.height = '45vh';

  const orderButton = document.createElement('button');
  orderButton.classList.add('order-button');
  orderButton.setAttribute('disabled', true);
  orderButton.innerHTML = `Place my order! <span>&rarr;</span>`;

  orderButton.addEventListener('click', async (e) => {
    e.preventDefault();
    handleOrder();
  });

  document.addEventListener('broth-changed', updateOrderButtonState);
  document.addEventListener('protein-changed', updateOrderButtonState);

  element.appendChild(brothCarousel);
  element.appendChild(proteinCarousel);
  element.appendChild(orderButton);

  return element;
}

function updateOrderButtonState() {
  const orderButton = document.querySelector('.order-button');
  const selectedBrothId = productContext.getSelectedBrothId();
  const selectedProteinId = productContext.getSelectedProteinId();

  if (selectedBrothId && selectedProteinId) {
    orderButton.removeAttribute('disabled');
  }
}

const handleOrder = async () => {
  try {
    const selectedBrothId = productContext.getSelectedBrothId();
    const selectedProteinId = productContext.getSelectedProteinId();

    const res = await apiService.post(`/orders`, {
      brothId: selectedBrothId,
      proteinId: selectedProteinId,
    });

    orderContext.setOrder(res);
    await renderPage('success');
  } catch (error) {
    console.error('Erro ao realizar pedido:', error);
  }
}

const renderBrothCarousel = async () => {
  const productCarousel = document.createElement('product-carousel');

  try {
    const products = await apiService.get('/broths');
    productCarousel.setAttribute('data-type', 'broth');
    productCarousel.setAttribute('data-title', 'First things first: select your favorite broth');
    productCarousel.setAttribute('data-subtitle', 'It will give the whole flavor on your ramen soup.');
    productCarousel.setAttribute('data-products', JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    productCarousel.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
  }

  return productCarousel;
}

const renderProteinCarousel = async () => {
  const productCarousel = document.createElement('product-carousel');

  try {
    const products = await apiService.get('/proteins');
    productCarousel.setAttribute('data-type', 'protein');
    productCarousel.setAttribute('data-title', `It's time to choose your meat!`);
    productCarousel.setAttribute('data-subtitle', `Some people love, some don't. We habe options for all tastes.`);
    productCarousel.setAttribute('data-products', JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    productCarousel.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
  }

  return productCarousel;
}