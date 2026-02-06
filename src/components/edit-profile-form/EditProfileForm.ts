import { User } from '../../api';
import { UsersController } from '../../controllers';
import { Block, type BlockProps, Store } from '../../core';
import { StoreEvents } from '../../core/';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';

import template from './EditProfileForm.hbs';

import './EditProfileForm.css';

export type EditProfileFormProps = BlockProps & {
  children: {
    firstNameInput: Input;
    secondNameInput: Input;
    displayNameInput: Input;
    loginInput: Input;
    emailInput: Input;
    phoneInput: Input;
    oldPasswordInput: Input;
    newPasswordInput: Input;
    submitButton: Button;
    cancelButton: Button;
  };
};

export class EditProfileForm extends Block<EditProfileFormProps> {
  private readonly _usersController = new UsersController();

  private readonly _store = new Store();
  private _userInfoSynced = false;

  constructor(props: EditProfileFormProps) {
    super({
      ...props,
      events: {
        ...(props.events ?? {}),
      },
    });

    this._setHandlers();

    this._store.on(StoreEvents.Updated, this._syncUserInfo);

    this._loadUserInfo();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _loadUserInfo() {
    this._usersController.getUserInfo();
  }

  private _setHandlers(): void {
    this.setProps({
      events: {
        ...(this.props.events ?? {}),
        submit: this._handleSubmit,
      },
    });
  }

  private _syncUserInfo = (): void => {
    const { userInfo } = this._store.getState() as { userInfo?: User };
    if (!userInfo || this._userInfoSynced) {
      return;
    }

    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    for (const input of inputs) {
      const control = input.element.querySelector('input');
      if (control && document.activeElement === control) {
        continue;
      }

      const key = input.name as keyof User;
      if (!(key in userInfo)) {
        continue;
      }

      const rawValue = userInfo[key];
      const nextValue = rawValue === null ? '' : String(rawValue);
      const currentValue = input.value ?? '';
      if (currentValue !== '' && currentValue !== nextValue) {
        continue;
      }

      if (currentValue !== nextValue) {
        input.setProps({ value: nextValue });
      }
    }

    this._userInfoSynced = true;
  };

  private _handleSubmit = (event: Event) => {
    event.preventDefault();
    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    const validatedInputs = inputs;
    let isValid = true;
    for (const input of validatedInputs) {
      if (!input.validate()) {
        isValid = false;
      }
    }

    if (!isValid) {
      console.log('Данные не валидны');
      return;
    }

    const values = Object.fromEntries(inputs.map((input) => [input.name, input.value]));

    console.log({
      ...values,
    });
  };
}
