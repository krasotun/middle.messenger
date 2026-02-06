import { AuthApi, type UserData } from '../../api/auth-api';
import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';

import template from './SignUpForm.hbs';

import './SignUpForm.css';

export type SignUpFormProps = BlockProps & {
  children: {
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
  private _authApi = new AuthApi();

  constructor(props: SignUpFormProps) {
    super({
      ...props,
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

    const values = this._collectValues(inputs);

    this._submit(values)
      .then(() => {
        console.log('Регистрация успешна');
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  private async _submit(values: UserData) {
    await this._authApi.signUp(values);
  }

  private _collectValues(inputs: Input[]): UserData {
    const values: UserData = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    };

    for (const input of inputs) {
      if (input.name in values) {
        values[input.name as keyof UserData] = input.value ?? '';
      }
    }

    return values;
  }
}
