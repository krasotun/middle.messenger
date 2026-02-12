import { SignUpForm } from '../../components/sign-up-form';
import { Block, type BlockProps } from '../../core';
import './SignUpPage.css';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';
import {
  emailValidator,
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../../shared/validators';

import template from './sign-up-page.hbs';

export type SignUpPageProps = BlockProps & {
  children: {
    signUpForm: SignUpForm;
  };
};

export class SignUpPage extends Block<SignUpPageProps> {
  constructor() {
    super({
      children: {
        signUpForm: new SignUpForm({
          children: {
            firstNameInput: new Input({
              name: 'firstName',
              label: 'Имя',
              type: 'text',
              validators: [nameValidator()],
              settings: {
                withInternalID: true,
              },
            }),
            secondNameInput: new Input({
              name: 'secondName',
              label: 'Фамилия',
              type: 'text',
              validators: [nameValidator()],
              settings: {
                withInternalID: true,
              },
            }),
            loginInput: new Input({
              name: 'login',
              label: 'Логин',
              type: 'text',
              validators: [loginValidator(), minLengthValidator(3), maxLengthValidator(20)],
              settings: {
                withInternalID: true,
              },
            }),
            emailInput: new Input({
              name: 'email',
              label: 'Почта',
              type: 'email',
              validators: [emailValidator()],
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
            phoneInput: new Input({
              name: 'phone',
              label: 'Телефон',
              type: 'tel',
              validators: [phoneValidator(), minLengthValidator(10), maxLengthValidator(15)],
              settings: {
                withInternalID: true,
              },
            }),
            submitButton: new Button({
              color: 'primary',
              type: 'submit',
              title: 'Зарегистрироваться',
              settings: {
                withInternalID: true,
              },
            }),
            signInLink: new Link({
              title: 'Есть аккаунт? Войти',
              href: '/',
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
    } as SignUpPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
