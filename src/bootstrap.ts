import renderTempNav from './components/temp-nav/temp-nav.ts';
import SignInPageTemplate from './pages/sign-in-page/index.ts';

export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    appContainer.innerHTML = renderTempNav() + SignInPageTemplate();
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
