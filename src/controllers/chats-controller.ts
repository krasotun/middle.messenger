import { ChatsApi } from '../api';
import { ChatTitle } from '../api/chats-api.ts';
import { Store } from '../core';

export class ChatsController {
  private readonly _chatsApi = new ChatsApi();
  private readonly _store = new Store();

  async addChat(title: ChatTitle) {
    try {
      await this._chatsApi.addChat(title);
      await this.loadChats();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async loadChats() {
    try {
      const chats = await this._chatsApi.getChats();
      this._store.set('chats', chats);
    } catch (error: unknown) {
      console.log(error);
    }
  }
}
