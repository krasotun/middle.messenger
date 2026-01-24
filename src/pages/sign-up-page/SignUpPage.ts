import { SignUpForm } from '../../components/sign-up-form/SignUpForm.ts';
import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import { Link } from '../../shared/components/link/Link.ts';
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

import './SignUpPage.css';

export type SignUpPageProps = BlockProps & {
  children: {
    signUpForm: SignUpForm;
  };
};

export class SignUpPage extends Block<SignUpPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

export const createSignUpPage = () =>
  new SignUpPage({
    children: {
      signUpForm: new SignUpForm({
        children: {
          firstNameInput: new Input({
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            validators: [nameValidator()],
            settings: {
              withInternalID: true,
            },
          }),
          secondNameInput: new Input({
            name: 'second_name',
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
            href: '/index.html',
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
