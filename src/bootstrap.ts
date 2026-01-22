import { SignInform } from './components/sign-in-form/SignInForm.ts';
import navigationMenu from './components/temp-nav/TempNav.ts';
import { SignInPage } from './pages/sign-in-page/SignInPage.ts';
import { Button } from './shared/components/button/Button.ts';
import { Input } from './shared/components/input/Input.ts';
import { Link } from './shared/components/link/Link.ts';

export default () => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    const signInForm = new SignInform({
      children: {
        loginInput: new Input({
          name: 'login',
          label: 'Имя пользователя',
          type: 'text',
          settings: {
            withInternalID: true,
          },
        }),
        passwordInput: new Input({
          name: 'password',
          label: 'Пароль',
          type: 'password',
          settings: {
            withInternalID: true,
          },
        }),
        submitButton: new Button({
          color: 'primary',
          type: 'submit',
          title: 'Войти',
          settings: {
            withInternalID: true,
          },
        }),
        signUpLink: new Link({
          title: 'Зарегистрироваться',
          href: '/sign-up',
          settings: {
            withInternalID: true,
          },
        }),
      },
      settings: {
        withInternalID: true,
      },
    });

    const signInPage = new SignInPage({
      children: {
        signInForm,
      },
    });
    appContainer.appendChild(navigationMenu.element);
    appContainer.appendChild(signInPage.element);
  } else {
    throw new Error('Container with id="app" not found! Please, create it');
  }
};
