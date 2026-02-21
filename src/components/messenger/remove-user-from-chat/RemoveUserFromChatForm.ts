import { ChatsController } from '../../../controllers';
import { type BlockProps } from '../../../core';
import { AddUserToChatResult } from '../../../model/Chat.ts';
import { Button } from '../../../shared/components/button';
import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';

import template from './RemoveUserFromChatForm.hbs';

import './RemoveUserFromChatForm.css';

export type RemoveUserFromChatFormProps = BlockProps & {
  children?: {
    userLoginInput: Input;
    submitButton: Button;
  };
};

export type RemoveUserFromChatFormValue = {
  userLogin: string;
};

export class RemoveUserFromChatForm extends Form<RemoveUserFromChatFormValue> {
  private readonly _chatsController = new ChatsController();

  constructor(props: RemoveUserFromChatFormProps = {}) {
    const submitButton = new Button({
      title: 'Удалить из чата',
      type: 'submit',
      color: 'danger',
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
      .removeUserFromChat(value)
      .then((result) => {
        if (result === AddUserToChatResult.NotFound) {
          const { userLoginInput } = this
            .children as Required<RemoveUserFromChatFormProps>['children'];
          userLoginInput.setErrorMessage('Пользователь не найден');
          return;
        }

        if (result === AddUserToChatResult.Ok) {
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
