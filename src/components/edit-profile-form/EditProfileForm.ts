import { UsersController } from '../../controllers';
import { BlockProps } from '../../core';
import type { User } from '../../model/User.ts';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';

import template from './EditProfileForm.hbs';

import './EditProfileForm.css';

export type EditProfileFormProps = BlockProps & {
  userProfile?: User;
  children?: {
    firstNameInput: Input;
    secondNameInput: Input;
    displayNameInput: Input;
    loginInput: Input;
    emailInput: Input;
    phoneInput: Input;
    submitButton: Button;
    cancelButton: Button;
  };
};

export type EditProfileFormValue = {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
};

export class EditProfileForm extends Form<EditProfileFormValue> {
  private readonly _usersController = new UsersController();

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  protected componentDidMount(): void {
    this._syncUserInfo();
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    const prevProfile = (oldProps as EditProfileFormProps).userProfile;
    const nextProfile = (newProps as EditProfileFormProps).userProfile;
    if (prevProfile !== nextProfile) {
      this._syncUserInfo();
    }
    return true;
  }

  private _syncUserInfo(): void {
    const { userProfile } = this.props as EditProfileFormProps;
    if (!userProfile) {
      return;
    }

    const fieldMap: Record<keyof EditProfileFormValue, keyof User> = {
      firstName: 'first_name',
      secondName: 'second_name',
      displayName: 'display_name',
      login: 'login',
      email: 'email',
      phone: 'phone',
    };

    for (const input of this.inputs) {
      const inputName = input.name as keyof EditProfileFormValue;
      const userKey = fieldMap[inputName];
      const rawValue = userProfile[userKey];
      const nextValue = rawValue === null ? '' : rawValue;
      const currentValue = input.value ?? '';

      if (currentValue !== nextValue) {
        input.setProps({ value: nextValue });
      }
    }
  }

  override _handleSubmit(event: Event) {
    event.preventDefault();
    if (!this._validateForm()) {
      return;
    }

    this._toggleFormDisabled(true);
    const value = this.rawValue;

    this._usersController
      .changeProfile(value)
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
      });
  }
}
