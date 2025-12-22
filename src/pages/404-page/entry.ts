import '../../styles/styles.css';

import renderTempNav from '../../components/temp-nav/temp-nav.ts';

import NotFoundPage from './index';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  if (!appContainer) {
    throw new Error('Container with id="app" not found! Please, create it');
  }

  appContainer.innerHTML = renderTempNav() + NotFoundPage({});
});
