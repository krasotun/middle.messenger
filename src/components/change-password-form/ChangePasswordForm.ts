import { UserChangePassword } from '../../api';
import { UsersController } from '../../controllers';
import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { maxLengthValidator, minLengthValidator, passwordValidator } from '../../shared/validators';

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

export class ChangePasswordForm extends Block<ChangePasswordFormProps> {
  private readonly _usersController = new UsersController();

  constructor(props: ChangePasswordFormProps = {}) {
    const defaultChildren = {
      oldPasswordInput: new Input({
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'password',
        validators: [passwordValidator(), minLengthValidator(8), maxLengthValidator(40)],
        settings: {
          withInternalID: true,
        },
      }),
      newPasswordInput: new Input({
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        validators: [passwordValidator(), minLengthValidator(8), maxLengthValidator(40)],
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
      .changePassword(values as UserChangePassword)
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
    const { submitButton } = this.children;
    submitButton.setProps({ disabled });
  }
}
