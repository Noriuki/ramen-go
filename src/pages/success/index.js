import '../../components/order-card';
import orderContext from '../../context/order';

export default async function SuccessPage() {
  const element = document.createElement('main');
  const order = orderContext.getOrder();

  element.classList.add('page-container');
  element.innerHTML = `
  <style>
    .order-container {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    order-card {
      height: 100vh;
      width: 100%;
    }
    .new-order__container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      align-items: center;
      text-align: center;
    }
  </style>
  <div class="order-container">
    <order-card
      data-id="${order.id}"
      data-image="${order.image}"
      data-description="${order.description}"
    >
    </order-card>
    <div class="new-order__container">
      <img class="new-order__image" src="${require('../../assets/images/success-icon.png')}" alt="Ramen" />
      <p class="new-order__message">どもありがとうございます。</p>
      <h4 class="new-order__message">Your order is being prepared!</h4>
      <span class="new-order__message">Hold on, when you least expect you will be eating your ramen</span>
      <button class="order-button">Create a new order <span>&rarr;</span></button>
    </div>
  </div>
  `

  // const orderButton = element.querySelector('.order-button');
  // orderButton.addEventListener('click', async (e) => {
  //   e.preventDefault();
  //   await renderPage('home');
  // });

  return element;
}

