import { SignInForm } from '../../components/sign-in-form/SignInForm.ts';
import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import { Link } from '../../shared/components/link/Link.ts';
import {
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  passwordValidator,
} from '../../shared/validators';

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
            validators: [loginValidator(), minLengthValidator(3), maxLengthValidator(20)],
            settings: {
              withInternalID: true,
            },
          }),
          passwordInput: new Input({
            name: 'password',
            label: 'Пароль',
            type: 'password',
            validators: [passwordValidator(), minLengthValidator(8), maxLengthValidator(40)],
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
