import { UsersController } from '../../controllers';
import { type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';

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

export type SignInFormValue = {
  login: string;
  password: string;
};

export class SignInForm extends Form<SignInFormValue> {
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
      .signInUser(value)
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
      });
  }
}
