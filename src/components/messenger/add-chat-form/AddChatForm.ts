import { ChatTitle } from '../../../api/chats-api.ts';
import { ChatsController } from '../../../controllers';
import { Block, type BlockProps } from '../../../core';
import { Button } from '../../../shared/components/button';
import { Input } from '../../../shared/components/input';

import template from './AddChatForm.hbs';

import './AddChatForm.css';

export type AddChatFormProps = BlockProps & {
  children?: {
    chatNameInput: Input;
    createButton: Button;
  };
};

export class AddChatForm extends Block<AddChatFormProps> {
  private readonly _chatsController = new ChatsController();

  constructor(props: AddChatFormProps = {}) {
    const createChatButton = new Button({
      title: 'Создать чат',
      type: 'submit',
      color: 'primary',
      disabled: true,
      settings: {
        withInternalID: true,
      },
    });
    const chatNameInput = new Input({
      name: 'title',
      type: 'text',
      placeholder: 'Название чата',
      settings: {
        withInternalID: true,
      },
    });

    super({
      ...props,
      children: {
        chatNameInput,
        createButton: createChatButton,
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
        input: this._handleInput,
        submit: this._handleSubmit.bind(this),
      },
    });
  }

  private _handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target || target.name !== 'title') {
      return;
    }

    this._toggleCreateButton(target.value.trim().length === 0);
  };

  private _handleSubmit(event: Event) {
    event.preventDefault();
    this._toggleFormDisabled(true);

    const { chatNameInput } = this.children as Required<AddChatFormProps>['children'];
    const value = (chatNameInput.value ?? '').trim();
    if (!value) {
      this._toggleFormDisabled(false);
      return;
    }

    this._chatsController
      .addChat(value as unknown as ChatTitle)
      .then(() => {
        chatNameInput.setProps({ value: '' });
        this._toggleCreateButton(true);
      })
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
      });
  }

  private _toggleCreateButton(disabled: boolean) {
    const { createButton } = this.children as Required<AddChatFormProps>['children'];
    createButton.setProps({ disabled });
  }

  private _toggleFormDisabled(disabled: boolean) {
    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    for (const input of inputs) {
      input.setProps({ disabled });
    }
    const { createButton } = this.children as Required<AddChatFormProps>['children'];
    createButton.setProps({ disabled });
  }
}
