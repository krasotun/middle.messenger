import { Block, type BlockProps } from '../../core/Block.ts';

import template from './Messenger.hbs';
import { MessengerSendMessageForm } from './send-message-form/MessengerSendMessageForm.ts';

import './Messenger.css';

export type MessengerProps = BlockProps & {
  children: {
    sendMessageForm: MessengerSendMessageForm;
  };
};

export class Messenger extends Block<MessengerProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
