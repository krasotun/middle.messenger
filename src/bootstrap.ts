// import renderTempNav from './components/temp-nav/temp-nav.ts';
// import SignInPageTemplate from './pages/sign-in-page/index.ts';
//
// export default () => {
//   const appContainer = document.getElementById('app');
//
//   if (appContainer) {
//     appContainer.innerHTML = renderTempNav() + SignInPageTemplate();
//   } else {
//     throw new Error('Container with id="app" not found! Please, create it');
//   }
// };

import { Button } from './shared/components/button/Button.ts';

export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    const clickHandler = (event: Event) => {
      console.log(event);
    };
    const button = new Button({
      title: 'Simple button',
      events: {
        click: clickHandler,
      },
    });

    appContainer.appendChild(button.element);
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
