import { BaseApi } from './base-api.ts';

export type Chat = {
  id: number;
  title: string;
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
