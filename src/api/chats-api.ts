import { Nullable } from '../types/nullable.type.ts';

import { BaseApi } from './base-api.ts';

export type Chat = {
  id: number;
  title: string;
  last_message: Nullable<{
    content?: string;
    time?: string;
  }>;
  unread_count: 0;
};

export type CreateChatRequest = Pick<Chat, 'title'>;
export type ChatId = Pick<Chat, 'id'>;

export type ActiveChat = Pick<Chat, 'id' | 'title'>;

export type ChatUsersRequest = {
  users: number[];
  chatId: number;
};

export class ChatsApi extends BaseApi {
  getChats() {
    return this.get('/chats');
  }

  createChat(data: CreateChatRequest) {
    return this.post('/chats', { data });
  }

  deleteChat(chatId: ChatId) {
    return this.delete('/chats', { data: { chatId: chatId.id } });
  }

  addUsersToChat(data: ChatUsersRequest) {
    return this.put('/chats/users', { data });
  }

  getChatToken(id: number) {
    return this.post(`/chats/token/${id.toString()}`, { data: { id } });
  }
}
