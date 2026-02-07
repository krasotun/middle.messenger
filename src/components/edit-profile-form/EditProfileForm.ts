import { User, UserProfile } from '../../api';
import { UsersController } from '../../controllers';
import { Block, type BlockProps, Store } from '../../core';
import { StoreEvents } from '../../core/';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import {
  emailValidator,
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  nameValidator,
  phoneValidator,
} from '../../shared/validators';

import template from './EditProfileForm.hbs';

import './EditProfileForm.css';

export type EditProfileFormProps = BlockProps & {
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

export class EditProfileForm extends Block<EditProfileFormProps> {
  private readonly _usersController = new UsersController();

  private readonly _store = new Store();
  private _userInfoSynced = false;

  constructor(props: EditProfileFormProps = {}) {
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
      displayNameInput: new Input({
        name: 'display_name',
        label: 'Отображаемое имя',
        type: 'text',
        validators: [],
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
        title: 'Сохранить',
        settings: {
          withInternalID: true,
        },
      }),
      cancelButton: new Button({
        color: 'secondary',
        type: 'button',
        title: 'Вернуться назад',
        events: {
          click: () => {
            this._usersController.goBack();
          },
        },
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

    this._store.on(StoreEvents.Updated, this._syncUserInfo);

    this._loadUserInfo();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _loadUserInfo() {
    this._usersController.loadData();
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
    const { userProfile } = this._store.getState() as { userProfile?: User };
    if (!userProfile || this._userInfoSynced) {
      return;
    }

    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    for (const input of inputs) {
      const control = input.element.querySelector('input');
      if (control && document.activeElement === control) {
        continue;
      }

      const key = input.name as keyof User;
      if (!(key in userProfile)) {
        continue;
      }

      const rawValue = userProfile[key];
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
    this._toggleFormDisabled(true);

    this._usersController
      .changeProfile(values as UserProfile)
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
    this._toggleSubmitButton(disabled);
  }

  private _toggleSubmitButton(disabled: boolean) {
    const { submitButton } = this.children;
    submitButton.setProps({
      disabled,
    });
  }
}
