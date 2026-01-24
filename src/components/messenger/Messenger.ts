import { Block, type BlockProps } from '../../core';

import template from './Messenger.hbs';
import { MessengerSendMessageForm } from './send-message-form';

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
