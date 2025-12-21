import '../../styles/styles.css';
import ServerErrorPage from './index.js';
import {renderTempNav} from '../../components/temp-nav/temp-nav.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  if (!appContainer) {
    throw new Error('Container with id="app" not found! Please, create it');
  }

  // Temporary navigation: remove after routing is added.
  appContainer.innerHTML = renderTempNav() + ServerErrorPage({});
});
