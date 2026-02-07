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
  constructor(props: AddChatFormProps = {}) {
    const createChatButton = new Button({
      title: 'Создать чат',
      type: 'button',
      color: 'primary',
      disabled: true,
      settings: {
        withInternalID: true,
      },
    });
    const chatNameInput = new Input({
      name: 'chatTitle',
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
      },
    });
  }

  private _handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target || target.name !== 'chatTitle') {
      return;
    }

    this._toggleCreateButton(target.value.trim().length === 0);
  };

  private _toggleCreateButton(disabled: boolean) {
    const { createButton } = this.children as Required<AddChatFormProps>['children'];
    createButton.setProps({ disabled });
  }
}
