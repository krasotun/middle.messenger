import { UserCreate } from '../../api';
import { UsersController } from '../../controllers/';
import { Block, type BlockProps } from '../../core';
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

import template from './SignUpForm.hbs';

import './SignUpForm.css';

export type SignUpFormProps = BlockProps & {
  children?: {
    firstNameInput: Input;
    secondNameInput: Input;
    loginInput: Input;
    emailInput: Input;
    passwordInput: Input;
    phoneInput: Input;
    submitButton: Button;
    signInLink: Link;
  };
};

export class SignUpForm extends Block<SignUpFormProps> {
  private readonly _usersController = new UsersController();

  constructor(props: SignUpFormProps = {}) {
    const defaultChildren = {
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
        href: '/',
        settings: {
          withInternalID: true,
        },
      }),
    };

    super({
      ...props,
      children: {
        ...defaultChildren,
        ...(props.children ?? {}),
      },
      events: {
        ...(props.events ?? {}),
      },
    });

    this._setHandlers();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _setHandlers(): void {
    this.setProps({
      events: {
        ...(this.props.events ?? {}),
        submit: this._handleSubmit,
      },
    });
  }

  private _handleSubmit = (event: Event) => {
    event.preventDefault();
    const inputs = Object.values(this.children).filter(
      (child): child is Input => child instanceof Input,
    );
    let isValid = true;
    for (const input of inputs) {
      if (!input.validate()) {
        isValid = false;
      }
    }

    if (!isValid) {
      console.log('Данные не валидны');
      return;
    }

    const values = Object.fromEntries(inputs.map((input) => [input.name, input.value]));
    this._toggleFormDisabled(true);
    this._usersController
      .register(values as UserCreate)
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
      });
  };

  private _toggleFormDisabled(disabled: boolean) {
    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    for (const input of inputs) {
      input.setProps({ disabled });
    }
    const { submitButton, signInLink } = this.children;
    submitButton.setProps({ disabled });
    signInLink.setProps({ disabled });
  }
}
