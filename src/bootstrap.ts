import { Input } from './shared/components/input/Input.ts';

export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    const inputsWrapper = document.createElement('div');
    inputsWrapper.className = 'demo-inputs';

    const inputInstances = [
      {
        label: 'Login',
        name: 'login',
        type: 'text',
        placeholder: 'Enter login',
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'name@example.com',
        error: 'Invalid email format',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: '••••••••',
        disabled: true,
      },
      {
        label: 'Phone',
        name: 'phone',
        type: 'tel',
        placeholder: '+1 555 000 0000',
        disabled: true,
        error: 'Phone is required',
      },
      {
        label: 'Age',
        name: 'age',
        type: 'number',
        placeholder: '18',
      },
    ] as const;

    inputInstances.forEach((props) => {
      const input = new Input({
        ...props,
        settings: { withInternalID: true },
      });
      inputsWrapper.appendChild(input.element);
    });

    appContainer.appendChild(inputsWrapper);
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
