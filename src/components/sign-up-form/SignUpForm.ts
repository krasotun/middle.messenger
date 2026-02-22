import { UsersController } from '../../controllers/';
import { type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';

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

export type SignUpFormValue = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class SignUpForm extends Form<SignUpFormValue> {
  private readonly _usersController = new UsersController();

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  override _handleSubmit(event: Event) {
    event.preventDefault();
    if (!this._validateForm()) {
      return;
    }

    this._toggleFormDisabled(true);
    const value = this.rawValue;

    this._usersController
      .signUpUser(value)
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
      });
  }
}
