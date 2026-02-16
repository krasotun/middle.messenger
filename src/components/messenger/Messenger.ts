import { UsersController } from '../../controllers';
import { Block, type BlockProps, connect, Router, Routes } from '../../core';
import type { AppState } from '../../core/Store.ts';
import { ActiveChat } from '../../model/Chat.ts';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { requiredValidator } from '../../shared/validators';
import { Nullable } from '../../types/nullable.type.ts';

import { AddUserToChat } from './add-user-to-chat';
import { ChatHeader } from './chat-header';
import { ChatList } from './chat-list';
import { CreateChatForm } from './create-chat-form';
import { Messages } from './messages';
import template from './Messenger.hbs';
import { MessengerSendMessageForm } from './send-message-form';

import './Messenger.css';

export type MessengerProps = BlockProps & {
  activeChat?: Nullable<ActiveChat>;
  isAddUserVisible?: boolean;
  children?: {
    addChatForm?: CreateChatForm;
    addUserToChat?: AddUserToChat;
    chatHeader?: ChatHeader;
    chatList?: ChatList;
    messages?: Messages;
    changePasswordButton?: Button;
    changeAvatarButton?: Button;
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
  private readonly _usersController = new UsersController();

  constructor(props: MessengerProps = {}) {
    const defaultChildren = {
      addChatForm: new CreateChatForm({
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
      changeAvatarButton: new Button({
        title: 'Сменить аватар',
        type: 'button',
        color: 'secondary',
        events: {
          click: () => {
            new Router().go(Routes.ChangeAvatarPage);
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
      isAddUserVisible: Boolean(props.activeChat),
      children: {
        ...defaultChildren,
        ...(props.children ?? {}),
      },
    } as MessengerProps);
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    if (oldProps.activeChat !== newProps.activeChat) {
      this.setProps({ isAddUserVisible: Boolean(newProps.activeChat) });
    }
    return true;
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
