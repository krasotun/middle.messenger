import { ChatsApi, UsersApi } from '../api';
import { AddUserToChatFormValue } from '../components/messenger/add-user-to-chat/AddUserToChat.ts';
import { CreateChatFormValue } from '../components/messenger/create-chat-form/CreateChatForm.ts';
import { Store } from '../core';
import { ActiveChat, ChatId, CreateChatRequest } from '../model/Chat.ts';
import { User, UserSearchRequest } from '../model/User.ts';

import { MessagesController } from './messages-controller.ts';

export type AddUserToChatResult = 'ok' | 'not_found' | 'no_active_chat';

export class ChatsController {
  private readonly _chatsApi = new ChatsApi();
  private readonly _messagesController = new MessagesController();
  private readonly _usersApi = new UsersApi();
  private readonly _store = new Store();

  async createChat(value: CreateChatFormValue) {
    try {
      const payload = this._prepareCreateChatPayload(value);

      const response = (await this._chatsApi.createChat(payload)) as {
        id?: number;
      } | null;
      if (response?.id) {
        this.setActiveChat({ id: response.id, title: payload.title });
      }
      await this.loadChats();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async deleteChat(chatId: ChatId) {
    try {
      await this._chatsApi.deleteChat(chatId);
      this._store.set('activeChat', null);
      this._messagesController.disconnect();
      await this.loadChats();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async loadChats() {
    try {
      const chats = await this._chatsApi.getChats();
      this._store.set('chats', chats);
      if (!Array.isArray(chats) || chats.length === 0) {
        this._store.set('activeChat', null);
        return;
      }

      const { activeChat } = this._store.getState();
      const hasActive = activeChat ? chats.some((chat) => chat.id === activeChat.id) : false;
      if (!hasActive) {
        const [firstChat] = chats;
        this.setActiveChat(firstChat);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  setActiveChat(chat: ActiveChat) {
    this._store.set('activeChat', chat);
    this._connectToChat(chat.id).catch(console.log);
  }

  ensureActiveChatConnection(): void {
    const { activeChat } = this._store.getState();
    if (!activeChat) {
      return;
    }

    this._connectToChat(activeChat.id).catch(console.log);
  }

  async addUserToChat(value: AddUserToChatFormValue): Promise<AddUserToChatResult> {
    try {
      const payload = this._prepareUserSearchPayload(value);
      const users = await this._usersApi.searchUser(payload);
      if (!Array.isArray(users) || users.length === 0) {
        return 'not_found';
      }

      const { activeChat } = this._store.getState();
      if (!activeChat) {
        return 'no_active_chat';
      }

      const userIds = Array.from(new Set(users.map((user) => user.id)));
      if (userIds.length === 0) {
        return 'not_found';
      }

      await this._chatsApi.addUsersToChat({
        users: userIds,
        chatId: activeChat.id,
      });

      return 'ok';
    } catch (error: unknown) {
      console.log(error);
    }
    return 'not_found';
  }

  private async _connectToChat(chatId: number) {
    const { userProfile } = this._store.getState() as { userProfile?: User };
    if (!userProfile) {
      return;
    }

    const tokenResponse = (await this._chatsApi.getChatToken(chatId)) as { token?: string };
    if (!tokenResponse.token) {
      return;
    }

    this._messagesController.connect({
      userId: userProfile.id,
      chatId,
      token: tokenResponse.token,
    });
  }

  private _prepareCreateChatPayload(value: CreateChatFormValue): CreateChatRequest {
    return {
      title: value.title,
    };
  }

  private _prepareUserSearchPayload(value: AddUserToChatFormValue): UserSearchRequest {
    return {
      login: value.userLogin,
    };
  }
}
