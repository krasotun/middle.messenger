import { UserCredentials } from '../../api';
import { UsersController } from '../../controllers';
import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';
import {
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  passwordValidator,
} from '../../shared/validators';

import template from './SignInForm.hbs';

import './SignInForm.css';

export type SignInFormProps = BlockProps & {
  children?: {
    loginInput: Input;
    passwordInput: Input;
    submitButton: Button;
    signUpLink: Link;
  };
};

export class SignInForm extends Block<SignInFormProps> {
  private readonly _usersController = new UsersController();

  constructor(props: SignInFormProps = {}) {
    const defaultChildren = {
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
    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
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
      .authorize(values as UserCredentials)
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
    const { submitButton, signUpLink } = this.children;
    submitButton.setProps({ disabled });
    signUpLink.setProps({ disabled });
  }
}
