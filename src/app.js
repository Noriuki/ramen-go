import appContext from './context/app';
import Home from './pages/home';
import SplashScreen from './pages/splash';
import SuccessPage from './pages/success';

export async function renderPage(page = 'splash') {
  const rootElement = document.getElementById('root');
  rootElement.innerHTML = '';

  appContext.setLoading(true);

  try {
    switch (page) {
      case 'splash':
        const splash = await SplashScreen();
        rootElement.appendChild(splash);
        break;
      case 'home':
        const home = await Home();
        rootElement.appendChild(home);
        break;
      case 'success':
        const success = await SuccessPage();
        rootElement.appendChild(success);
        break;
      default:
        rootElement.innerHTML = '<h2>Página não encontrada</h2>';
    }
  } catch (error) {
    console.error(error);
    rootElement.innerHTML = '<h2>Erro ao carregar a página</h2>';
  } finally {
    appContext.setLoading(false);
  }

}

document.addEventListener('loading-changed', () => {
  if (appContext.loading) {
    showLoading();
  } else {
    hideLoading();
  }
});

document.addEventListener('loading-changed', () => {
  if (appContext.loading) {
    showLoading();
  } else {
    hideLoading();
  }
});

function showLoading() {
  const rootElement = document.getElementById('root');
  const loadingElement = document.createElement('div');
  loadingElement.id = 'loading';
  loadingElement.innerHTML = `
    <style>
      #loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 9999;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid var(--default-blue);
        border-top: 5px solid var(--default-red);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <div class="spinner"></div>
  `;
  rootElement.appendChild(loadingElement);
}

function hideLoading() {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.remove();
  }
}