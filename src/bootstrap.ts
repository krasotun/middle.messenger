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
      type: 'button',
      disabled: true,
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
      submitText: 'Submit',
    });
    appContainer.appendChild(form.element);
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
