import { MessagesApi } from '../api';
import { Store } from '../core';

export type Message = {
  id?: number;
  user_id?: number;
  chat_id?: number;
  time?: string;
  type?: string;
  content?: string;
};

type MessagesState = Record<number, Message[]>;

type ConnectParams = {
  userId: number;
  chatId: number;
  token: string;
};

const PING_INTERVAL_MS = 10000;

export class MessagesController {
  private static _instance: MessagesController | null = null;
  private readonly _messagesApi = new MessagesApi();
  private readonly _store = new Store();
  private _socket: WebSocket | null = null;
  private _activeChatId: number | null = null;
  private _pingIntervalId: number | null = null;

  constructor() {
    if (MessagesController._instance) {
      return MessagesController._instance;
    }
    MessagesController._instance = this;
  }

  connect({ userId, chatId, token }: ConnectParams): void {
    this.disconnect();
    this._activeChatId = chatId;
    const socket = this._messagesApi.initConnection({ userId, chatId, token });
    this._socket = socket;

    socket.addEventListener('open', () => {
      this._requestOldMessages();
      this._startPing();
    });

    socket.addEventListener('message', (event: MessageEvent) => {
      this._handleMessage(String(event.data), chatId);
    });

    socket.addEventListener('close', () => {
      this._stopPing();
    });

    socket.addEventListener('error', (_event: Event) => {});
  }

  connectToActiveChat(userId: number, token: string): void {
    const { activeChat } = this._store.getState();
    if (!activeChat) {
      return;
    }

    if (this._activeChatId === activeChat.id) {
      return;
    }

    this.connect({ userId, chatId: activeChat.id, token });
  }

  disconnect(): void {
    this._stopPing();
    this._messagesApi.close();
    this._socket = null;
    this._activeChatId = null;
  }

  sendMessage(content: string): void {
    if (!this._socket) {
      return;
    }

    if (this._socket.readyState !== WebSocket.OPEN) {
      return;
    }

    this._socket.send(
      JSON.stringify({
        type: 'message',
        content,
      }),
    );
  }

  private _requestOldMessages(): void {
    if (!this._socket) {
      return;
    }

    this._socket.send(
      JSON.stringify({
        type: 'get old',
        content: '0',
      }),
    );
  }

  private _handleMessage(raw: string, chatId: number): void {
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return;
    }

    if (Array.isArray(data)) {
      this._setMessages(chatId, data as Message[]);
      return;
    }

    const message = data as Message;
    if (message.type !== 'message') {
      return;
    }

    this._addMessage(chatId, message);
    this._store.set('messagesUpdatedAt', Date.now());
  }

  private _setMessages(chatId: number, messages: Message[]) {
    const { messages: current } = this._store.getState() as { messages?: MessagesState };
    this._store.set('messages', {
      ...(current ?? {}),
      [chatId]: messages,
    });
  }

  private _addMessage(chatId: number, message: Message) {
    const { messages: current } = this._store.getState() as { messages?: MessagesState };
    const list = current?.[chatId] ?? [];
    this._store.set('messages', {
      ...(current ?? {}),
      [chatId]: [...list, message],
    });
  }

  private _startPing(): void {
    this._stopPing();
    this._pingIntervalId = window.setInterval(() => {
      if (!this._socket) {
        return;
      }
      this._socket.send(JSON.stringify({ type: 'ping' }));
    }, PING_INTERVAL_MS);
  }

  private _stopPing(): void {
    if (this._pingIntervalId === null) {
      return;
    }
    window.clearInterval(this._pingIntervalId);
    this._pingIntervalId = null;
  }
}
