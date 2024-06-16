
import { renderPage } from '../../app.js';

export default async function SplashScreen() {
  const element = document.createElement('main');

  element.classList.add('page-container');
  element.innerHTML = `
  <style>
    .brand {
      margin: 0;
      font-size: 1.5em;  
      font-weight: 900;
      letter-spacing: 0.2rem;
      color: var(--default-yellow);  
    }
    .hero-section {
      width: 100%;
      display: flex;
      padding: 1rem;
      align-items: center;
      flex-direction: column;
      background-size: cover;
      background-position: center;
      justify-content: space-between;
      background-image: url(${require('../../assets/images/red-pattern.png')});
    }

    .delivery-girl-container {
      width: 100%;
      max-width: 300px;
    }

    .container {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }

    .container h3 {
      font-size: 1.2em;
      font-weight: 600;
      color: var(--default-white);
      text-align: center;
    }

    .title-container {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .title-container h2 {
      margin: 0;
      font-size: 6em;
      font-weight: 900;
      color: var(--default-white);
    }

    .title-container .ramen-text {
      font-size: 4em;
      font-weight: 900;
      color: var(--default-yellow);
      writing-mode: horizontal-tb;
    }

    @media (min-width: 768px) {

      .brand {
        font-size: 2em;  
      }
      .delivery-girl-container {
        width: 50%;
        z-index: 1;
        max-width: 600px;
        position: absolute;
      }
      .hero-section {
        padding: 2rem;
        height: 100vh;
        justify-content: center;
      }
      .container{
        z-index: 2;
        left: 20%;
        width: 40%;
        max-width: 400px;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      .title-container {
        align-items: baseline;
        flex-direction: row;
      }
      .title-container h2 {
        font-size: 10em;
      }
      .title-container .ramen-text {
        font-size: 4em;
        writing-mode: vertical-rl;
      }
    }
  </style>
  <div class="hero-section">
    <h1 class="brand">ramenGO!</h1>
    <div class="delivery-girl-container">
      <img 
        width="100%"
        height="100%"
        alt="delivery-girl" 
        src="${require('../../assets/images/delivery-girl.svg')}" 
      />
    </div>
    <div class="container">
      <div class="title-container">
        <span class="ramen-text">ラーメン</span>
        <h2>GO!</h2>
      </div>
      <button class="order-button">
        Order Now 
        <span>&rarr;</span>
      </button>
      <h3>
        Enjoy a good ramen in the comfort of your house.\n
        Create your own ramen and choose your favorite flavour combination.
      </h3>
    </div>
  </div>
  `

  const orderButton = element.querySelector('.order-button');

  orderButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await renderPage('home');
  });

  return element;
}

