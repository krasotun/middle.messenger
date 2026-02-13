import { UsersController } from '../../controllers';
import { BlockProps, Store } from '../../core';
import { User } from '../../model/User.ts';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';

import template from './EditProfileForm.hbs';

import './EditProfileForm.css';

export type EditProfileFormProps = BlockProps & {
  userProfile: User;
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

  private readonly _store = new Store();
  // private _userInfoSynced = false;

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  protected componentDidMount() {
    console.log('edit profile component did mount');
    this._syncUserProfile();
  }

  private _syncUserProfile = () => {
    const { userProfile } = this._store.getState();

    this.setProps({ userProfile });
  };

  protected componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps): boolean {
    console.log('old', _oldProps);
    console.log('new', _newProps);
    return true;
  }
  // private _syncUserInfo = (): void => {
  //   const { userProfile } = this._store.getState() as { userProfile?: User };
  //   if (!userProfile || this._userInfoSynced) {
  //     return;
  //   }
  //
  //   const inputs = Object.values(this.children).filter((child) => child instanceof Input);
  //   for (const input of inputs) {
  //     const control = input.element.querySelector('input');
  //     if (control && document.activeElement === control) {
  //       continue;
  //     }
  //
  //     const key = input.name as keyof User;
  //     if (!(key in userProfile)) {
  //       continue;
  //     }
  //
  //     const rawValue = userProfile[key];
  //     const nextValue = rawValue === null ? '' : String(rawValue);
  //     const currentValue = input.value ?? '';
  //     if (currentValue !== '' && currentValue !== nextValue) {
  //       continue;
  //     }
  //
  //     if (currentValue !== nextValue) {
  //       input.setProps({ value: nextValue });
  //     }
  //   }
  //
  //   this._userInfoSynced = true;
  // };

  override _handleSubmit(event: Event) {
    event.preventDefault();
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
