import { Nullable } from '../types/nullable.type.ts';

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
