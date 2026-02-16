import { ChatsController } from '../../../controllers';
import { type BlockProps } from '../../../core';
import { Button } from '../../../shared/components/button';
import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';

import template from './AddUserToChat.hbs';

import './AddUserToChat.css';

export type AddUserToChatFormProps = BlockProps & {
  children?: {
    userLoginInput: Input;
    submitButton: Button;
  };
};

export type AddUserToChatFormValue = {
  userLogin: string;
};

export class AddUserToChat extends Form<AddUserToChatFormValue> {
  private readonly _chatsController = new ChatsController();

  constructor(props: AddUserToChatFormProps = {}) {
    const submitButton = new Button({
      title: 'Добавить в чат',
      type: 'submit',
      color: 'primary',
      disabled: true,
      settings: {
        withInternalID: true,
      },
    });
    const userLoginInput = new Input({
      name: 'userLogin',
      type: 'text',
      placeholder: 'Логин пользователя',
      settings: {
        withInternalID: true,
      },
      onChange: (value) => {
        const nextValue = typeof value === 'string' ? value : '';
        this._handleLoginInputChange(nextValue);
      },
    });

    super({
      ...props,
      children: {
        userLoginInput,
        submitButton,
      },
      events: {},
    });
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  override _handleSubmit(event: Event) {
    event.preventDefault();
    this._toggleFormDisabled(true);

    const value = this.rawValue;

    this._chatsController
      .addUserToChat(value)
      .then((result) => {
        console.log(result);
        if (result === 'not_found') {
          const { userLoginInput } = this.children as Required<AddUserToChatFormProps>['children'];
          userLoginInput.setErrorMessage('Пользователь не найден');
          return;
        }

        if (result === 'ok') {
          this._resetAllInputs();
          this._toggleFormDisabled(true);
        }
      })
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
      });
  }

  private _handleLoginInputChange(value: string) {
    const disabled = value.length === 0;

    if (value.length === 0) {
      this._resetAllInputs();
    }

    this._toggleFormSubmitButtonDisabled(disabled);
  }
}
