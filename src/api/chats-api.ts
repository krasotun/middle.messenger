import { Nullable } from '../types/nullable.type.ts';

import { BaseApi } from './base-api.ts';

export type Chat = {
  id: number;
  title: string;
  last_message: Nullable<string>;
  unread_count: 0;
};

export type ChatTitle = Pick<Chat, 'title'>;

export class ChatsApi extends BaseApi {
  getChats() {
    return this.get('/chats');
  }

  addChat(title: ChatTitle) {
    return this.post('/chats', { data: { title } });
  }
}
