import '../../styles/styles.css';

import EditProfilePage from './index';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  if (!appContainer) {
    throw new Error('Container with id="app" not found! Please, create it');
  }

  appContainer.innerHTML = EditProfilePage({});
});
