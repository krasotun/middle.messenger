import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';

import { AddChatForm } from './add-chat-form';
import template from './Messenger.hbs';
import { MessengerSendMessageForm } from './send-message-form';

import './Messenger.css';

export type MessengerProps = BlockProps & {
  children: {
    addChatForm: AddChatForm;
    changePasswordButton: Button;
    editProfileButton: Button;
    logoutButton: Button;
    sendMessageForm: MessengerSendMessageForm;
  };
};

export class Messenger extends Block<MessengerProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
