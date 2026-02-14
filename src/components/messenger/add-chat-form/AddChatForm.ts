import { ChatsController } from '../../../controllers';
import type { BlockProps } from '../../../core';
import { Button } from '../../../shared/components/button';
import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';

import template from './AddChatForm.hbs';

import './AddChatForm.css';

export type AddChatFormProps = BlockProps & {
  children?: {
    titleInput: Input;
    submitButton: Button;
  };
};

export type AddChatFormValue = {
  title: string;
};

export class AddChatForm extends Form<AddChatFormValue> {
  private readonly _chatsController = new ChatsController();

  constructor(props: AddChatFormProps) {
    const submitButton = new Button({
      title: 'Создать чат',
      type: 'submit',
      color: 'primary',
      disabled: true,
      settings: {
        withInternalID: true,
      },
    });
    const titleInput = new Input({
      name: 'title',
      type: 'text',
      value: '',
      placeholder: 'Название чата',
      settings: {
        withInternalID: true,
      },
      onChange: (value) => {
        this._handleTitleInputChange(value);
      },
    });

    super({
      ...props,
      children: {
        titleInput,
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
      .createChat(value)
      .then(() => {
        this._clearAllInputs();
      })
      .catch(console.log)
      .finally(() => {
        this._toggleFormInputsDisabled(false);
      });
  }

  private _handleTitleInputChange(value: string) {
    const disabled = value.length === 0;
    this._toggleFormSubmitButtonDisabled(disabled);
  }
}
