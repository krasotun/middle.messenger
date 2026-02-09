import { UsersController } from '../../controllers';
import { Block, type BlockProps, Router, Routes } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { requiredValidator } from '../../shared/validators';

import { AddChatForm } from './add-chat-form';
import { ChatList } from './chat-list';
import template from './Messenger.hbs';
import { MessengerSendMessageForm } from './send-message-form';

import './Messenger.css';

export type MessengerProps = BlockProps & {
  children?: {
    addChatForm?: AddChatForm;
    chatList?: ChatList;
    changePasswordButton?: Button;
    editProfileButton?: Button;
    logoutButton?: Button;
    sendMessageForm?: MessengerSendMessageForm;
  };
};

export class Messenger extends Block<MessengerProps> {
  constructor(props: MessengerProps = {}) {
    const defaultChildren = {
      addChatForm: new AddChatForm({
        settings: {
          withInternalID: true,
        },
      }),
      chatList: new ChatList({
        settings: {
          withInternalID: true,
        },
      }),
      changePasswordButton: new Button({
        title: 'Сменить пароль',
        type: 'button',
        color: 'secondary',
        events: {
          click: () => {
            new Router().go(Routes.ChangePasswordPage);
          },
        },
        settings: {
          withInternalID: true,
        },
      }),
      editProfileButton: new Button({
        title: 'Редактировать профиль',
        type: 'button',
        color: 'secondary',
        events: {
          click: () => {
            new Router().go(Routes.EditProfilePage);
          },
        },
        settings: {
          withInternalID: true,
        },
      }),
      logoutButton: new Button({
        title: 'Выйти из системы',
        type: 'button',
        color: 'danger',
        events: {
          click: () => {
            new UsersController().logout();
          },
        },
        settings: {
          withInternalID: true,
        },
      }),
      sendMessageForm: new MessengerSendMessageForm({
        children: {
          messageInput: new Input({
            name: 'message',
            label: 'Сообщение',
            type: 'text',
            placeholder: 'Сообщение',
            validators: [requiredValidator()],
            settings: {
              withInternalID: true,
            },
          }),
          sendButton: new Button({
            title: 'Отправить',
            type: 'submit',
            color: 'primary',
            settings: {
              withInternalID: true,
            },
          }),
        },
        settings: {
          withInternalID: true,
        },
      }),
    };

    super({
      ...props,
      children: {
        ...defaultChildren,
        ...(props.children ?? {}),
      },
    });
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
