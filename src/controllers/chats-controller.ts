import { ChatsApi } from '../api';
import { ActiveChat, Chat, ChatId } from '../api/chats-api.ts';
import { Store } from '../core';

export class ChatsController {
  private readonly _chatsApi = new ChatsApi();
  private readonly _store = new Store();

  async addChat(title: string) {
    try {
      const response = (await this._chatsApi.addChat(title)) as {
        id?: number;
      } | null;
      if (response?.id) {
        this._store.set('activeChat', { id: response.id, title });
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
      await this.loadChats();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async loadChats() {
    try {
      const chats = (await this._chatsApi.getChats()) as Chat[];
      this._store.set('chats', chats);
      if (!Array.isArray(chats) || chats.length === 0) {
        this._store.set('activeChat', null);
        return;
      }

      const { activeChat } = this._store.getState() as { activeChat?: ActiveChat | null };
      const hasActive = activeChat ? chats.some((chat) => chat.id === activeChat.id) : false;
      if (!hasActive) {
        this._store.set('activeChat', { id: chats[0].id, title: chats[0].title });
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  setActiveChat(chat: ActiveChat) {
    this._store.set('activeChat', chat);
  }
}
