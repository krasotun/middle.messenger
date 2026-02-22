import { Chat, ChatId, ChatUsersRequest, CreateChatRequest } from '../model/Chat.ts';

import { BaseApi } from './base-api.ts';

export class ChatsApi extends BaseApi {
  getChats(): Promise<Chat[]> {
    return this.get<Chat[]>('/chats');
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

  removeUsersFromChat(data: ChatUsersRequest) {
    return this.delete('/chats/users', { data });
  }

  getChatToken(id: number) {
    return this.post(`/chats/token/${id.toString()}`, { data: { id } });
  }
}
