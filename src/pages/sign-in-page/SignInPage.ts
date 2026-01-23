import { SignInForm } from '../../components/sign-in-form/SignInForm.ts';
import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import { Link } from '../../shared/components/link/Link.ts';

import template from './SignInPage.hbs';

import './SignInPage.css';

export type SignInPageProps = BlockProps & {
  children: {
    signInForm: SignInForm;
  };
};

export class SignInPage extends Block<SignInPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

export const createSignInPage = () =>
  new SignInPage({
    children: {
      signInForm: new SignInForm({
        children: {
          loginInput: new Input({
            name: 'login',
            label: 'Имя пользователя',
            type: 'text',
            events: {
              'blur:input': (e) => {
                console.log(e);
              },
            },
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
            href: '/sign-up.html',
            settings: {
              withInternalID: true,
            },
          }),
        },
        settings: {
          withInternalID: true,
        },
      }),
    },
  });
