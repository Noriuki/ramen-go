import Home from './pages/home';
import SplashScreen from './pages/splash';
import SuccessPage from './pages/success';

export async function renderPage(page = 'splash') {
  const rootElement = document.getElementById('root');
  rootElement.innerHTML = '';

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
}