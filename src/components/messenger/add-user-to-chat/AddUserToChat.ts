import { ChatsController } from '../../../controllers';
import { Block, type BlockProps, Store, StoreEvents } from '../../../core';
import { Button } from '../../../shared/components/button';
import { Input } from '../../../shared/components/input';

import template from './AddUserToChat.hbs';

import './AddUserToChat.css';

export type AddUserToChatProps = BlockProps & {
  isVisible?: boolean;
  children?: {
    userLoginInput: Input;
    addButton: Button;
  };
};

export class AddUserToChat extends Block<AddUserToChatProps> {
  private readonly _store = new Store();
  private readonly _chatsController = new ChatsController();

  constructor(props: AddUserToChatProps = {}) {
    const addButton = new Button({
      title: 'Добавить в чат',
      type: 'submit',
      color: 'primary',
      disabled: true,
      settings: {
        withInternalID: true,
      },
    });
    const userLoginInput = new Input({
      name: 'login',
      type: 'text',
      placeholder: 'Логин пользователя',
      settings: {
        withInternalID: true,
      },
    });

    super({
      isVisible: false,
      ...props,
      children: {
        userLoginInput,
        addButton,
        ...(props.children ?? {}),
      },
      events: {
        ...(props.events ?? {}),
      },
    });

    this._store.on(StoreEvents.Updated, this._syncChats);
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
        submit: (event: Event) => {
          void this._handleSubmit(event);
        },
      },
    });
  }

  private _syncChats = () => {
    const { chats } = this._store.getState() as { chats?: unknown[] };
    const hasChats = Array.isArray(chats) && chats.length > 0;
    this.setProps({ isVisible: hasChats });
  };

  private _handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target || target.name !== 'login') {
      return;
    }

    const { userLoginInput } = this.children as Required<AddUserToChatProps>['children'];
    userLoginInput.setProps({ isValid: true, errorMessage: '' });

    this._toggleAddButton(target.value.trim().length === 0);
  };

  private async _handleSubmit(event: Event) {
    event.preventDefault();
    this._toggleFormDisabled(true);

    const { userLoginInput } = this.children as Required<AddUserToChatProps>['children'];
    const value = (userLoginInput.value ?? '').trim();
    if (!value) {
      this._toggleFormDisabled(false);
      return;
    }

    try {
      const result = await this._chatsController.addUserToChat(value);
      if (result === 'not_found') {
        userLoginInput.setProps({
          isValid: false,
          errorMessage: 'Пользователь не найден',
        });
        return;
      }

      if (result === 'ok') {
        userLoginInput.setProps({ value: '', isValid: true, errorMessage: '' });
        this._toggleAddButton(true);
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      this._toggleFormDisabled(false);
    }
  }

  private _toggleAddButton(disabled: boolean) {
    const { addButton } = this.children as Required<AddUserToChatProps>['children'];
    addButton.setProps({ disabled });
  }

  private _toggleFormDisabled(disabled: boolean) {
    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    for (const input of inputs) {
      input.setProps({ disabled });
    }
    const { addButton } = this.children as Required<AddUserToChatProps>['children'];
    addButton.setProps({ disabled });
  }
}
