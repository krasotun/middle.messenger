import navigationMenu from './components/temp-nav/TempNav.ts';
import { createNotFoundPage } from './pages/404-page/index.ts';
import { createServerErrorPage } from './pages/500-page/index.ts';
import { createEditProfilePage } from './pages/edit-profile-page/index.ts';
import { createMainPage } from './pages/main-page/index.ts';
import { createSignInPage } from './pages/sign-in-page/index.ts';
import { createSignUpPage } from './pages/sign-up-page/index.ts';

export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    const path = window.location.pathname;

    appContainer.innerHTML = '';
    appContainer.appendChild(navigationMenu.element);

    switch (path) {
      case '/':
      case '/index.html':
      case '/sign-in':
        appContainer.appendChild(createSignInPage().element);
        break;
      case '/sign-up':
      case '/sign-up.html':
        appContainer.appendChild(createSignUpPage().element);
        break;
      case '/edit-profile.html':
        appContainer.appendChild(createEditProfilePage().element);
        break;
      case '/main.html':
        appContainer.appendChild(createMainPage().element);
        break;
      case '/500.html':
        appContainer.appendChild(createServerErrorPage().element);
        break;
      case '/404.html':
        appContainer.appendChild(createNotFoundPage().element);
        break;
      default:
        appContainer.appendChild(createNotFoundPage().element);
        break;
    }
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
