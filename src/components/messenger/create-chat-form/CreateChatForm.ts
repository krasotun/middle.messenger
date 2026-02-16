import { ChatsController } from '../../../controllers';
import type { BlockProps } from '../../../core';
import { Button } from '../../../shared/components/button';
import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';

import template from './CreateChatForm.hbs';

import './CreateChatForm.css';

export type CreateChatFormProps = BlockProps & {
  children?: {
    titleInput: Input;
    submitButton: Button;
  };
};

export type CreateChatFormValue = {
  title: string;
};

export class CreateChatForm extends Form<CreateChatFormValue> {
  private readonly _chatsController = new ChatsController();

  constructor(props: CreateChatFormProps) {
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
        this._resetAllInputs();
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
