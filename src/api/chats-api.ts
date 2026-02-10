import { Nullable } from '../types/nullable.type.ts';

import { BaseApi } from './base-api.ts';

export type Chat = {
  id: number;
  title: string;
  last_message: Nullable<string>;
  unread_count: 0;
};

export type ChatTitle = Pick<Chat, 'title'>;
export type ChatId = Pick<Chat, 'id'>;

export type ActiveChat = Pick<Chat, 'id' | 'title'>;

export class ChatsApi extends BaseApi {
  getChats() {
    return this.get('/chats');
  }

  addChat(title: string) {
    return this.post('/chats', { data: { title } });
  }

  deleteChat(chatId: ChatId) {
    return this.delete('/chats', { data: { chatId: chatId.id } });
  }
}
