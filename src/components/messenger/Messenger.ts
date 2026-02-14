import { UsersController } from '../../controllers';
import { Block, type BlockProps, connect, Router, Routes, Store } from '../../core';
import type { AppState } from '../../core/Store.ts';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { requiredValidator } from '../../shared/validators';

import { AddChatForm } from './add-chat-form';
import { AddUserToChat } from './add-user-to-chat';
import { ChatHeader } from './chat-header';
import { ChatList } from './chat-list';
import { Messages } from './messages';
import template from './Messenger.hbs';
import { MessengerSendMessageForm } from './send-message-form';

import './Messenger.css';

export type MessengerProps = BlockProps & {
  children?: {
    addChatForm?: AddChatForm;
    addUserToChat?: AddUserToChat;
    chatHeader?: ChatHeader;
    chatList?: ChatList;
    messages?: Messages;
    changePasswordButton?: Button;
    editProfileButton?: Button;
    logoutButton?: Button;
    sendMessageForm?: MessengerSendMessageForm;
  };
};

const mapStateToProps = (state: AppState) => {
  const { chats, activeChat } = state;
  return { chats, activeChat };
};

const connectedChatList = connect(ChatList, mapStateToProps);

export class Messenger extends Block<MessengerProps> {
  private readonly _store = new Store();
  private readonly _usersController = new UsersController();

  constructor(props: MessengerProps = {}) {
    const defaultChildren = {
      addChatForm: new AddChatForm({
        settings: {
          withInternalID: true,
        },
      }),
      addUserToChat: new AddUserToChat({
        settings: {
          withInternalID: true,
        },
      }),
      chatHeader: new ChatHeader({
        title: 'Выберите чат',
        settings: {
          withInternalID: true,
        },
      }),
      chatList: new connectedChatList({
        settings: {
          withInternalID: true,
        },
        chats: [],
      }),
      messages: new Messages({
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
            this._usersController.logout();
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
    } as MessengerProps);

    const { userProfile } = this._store.getState() as { userProfile?: unknown };
    if (!userProfile) {
      this._usersController.loadUserData().catch(console.log);
    }
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
