import { UsersController } from '../../controllers';
import { BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';

import template from './ChangePasswordForm.hbs';

import './ChangePasswordForm.css';

export type ChangePasswordFormProps = BlockProps & {
  children?: {
    oldPasswordInput: Input;
    newPasswordInput: Input;
    submitButton: Button;
    cancelButton: Button;
  };
};

export type ChangePasswordFormValue = {
  oldPassword: string;
  newPassword: string;
};

export class ChangePasswordForm extends Form<ChangePasswordFormValue> {
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
      .changePassword(value)
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
        this._clearAllInputs();
      });
  }
}
