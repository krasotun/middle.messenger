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
import { Form } from './shared/components/form/Form.ts';

export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    const clickHandler = (event: Event) => {
      console.log(event);
    };
    const submitButton = new Button({
      title: 'Simple button',
      events: {
        click: clickHandler,
      },
      settings: {
        withInternalID: true,
      },
    });

    const form = new Form({
      title: 'Marat form',
      submitButton,
    });
    appContainer.appendChild(form.element);
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
