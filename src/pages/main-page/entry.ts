import '../../styles/styles.css';

import MainPage from './index';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  if (!appContainer) {
    throw new Error('Container with id="app" not found! Please, create it');
  }

  appContainer.innerHTML = MainPage({});
});
