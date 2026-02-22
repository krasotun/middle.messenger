export type Message = {
  id?: number;
  user_id?: number;
  chat_id?: number;
  time?: string;
  type?: string;
  content?: string;
};

export type MessagesState = Record<number, Message[]>;

export type MessengerConnectParams = {
  userId: number;
  chatId: number;
  token: string;
};
