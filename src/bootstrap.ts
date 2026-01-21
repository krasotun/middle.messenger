export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    console.log('bootstrap bootstrap');
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
