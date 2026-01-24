import { Block, type BlockProps } from '../../../core/Block.ts';
import { Button } from '../../../shared/components/button/Button.ts';
import { Input } from '../../../shared/components/input/Input.ts';

import template from './MessengerSendMessageForm.hbs';

import './MessengerSendMessageForm.css';

export type MessengerSendMessageFormProps = BlockProps & {
  children: {
    messageInput: Input;
    sendButton: Button;
  };
};

export class MessengerSendMessageForm extends Block<MessengerSendMessageFormProps> {
  constructor(props: MessengerSendMessageFormProps) {
    super({
      ...props,
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
    const { messageInput } = this.children as MessengerSendMessageFormProps['children'];
    const isValid = messageInput.validate();
    if (!isValid) {
      console.log('Сообщение не валидно');
      return;
    }

    console.log({
      [messageInput.name]: messageInput.value,
    });
  };
}
