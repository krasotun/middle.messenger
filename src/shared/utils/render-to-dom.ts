export const renderToDom = (element: HTMLElement) => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    appContainer.innerHTML = '';
    appContainer.appendChild(element);
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
