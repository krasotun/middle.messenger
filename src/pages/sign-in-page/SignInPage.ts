import { SignInForm } from '../../components/sign-in-form';
import { Block, type BlockProps } from '../../core';
import './SignInPage.css';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';
import {
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  passwordValidator,
} from '../../shared/validators';

import template from './SignInPage.hbs';
export type SignInPageProps = BlockProps & {
  children: {
    signInForm: SignInForm;
  };
};

export class SignInPage extends Block<SignInPageProps> {
  constructor() {
    super({
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
              href: '/sign-up',
              settings: {
                withInternalID: true,
              },
            }),
          },
          settings: {
            withInternalID: true,
          },
          events: {},
        }),
      },
    } as SignInPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
