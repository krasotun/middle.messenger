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
  private _pingIntervalId: number | null = null;
  private _onOpen: (() => void) | null = null;
  private _onMessage: ((event: MessageEvent) => void) | null = null;
  private _onClose: (() => void) | null = null;
  private _onError: ((event: Event) => void) | null = null;

  constructor() {
    if (MessagesController._instance) {
      return MessagesController._instance;
    }
    MessagesController._instance = this;
  }

  connectToChat({ userId, chatId, token }: ConnectParams): void {
    this.disconnect();
    const socket = this._messagesApi.initConnection({ userId, chatId, token });
    this._socket = socket;

    this._bindSocketListeners(socket, chatId);
  }

  disconnect(): void {
    this._stopPing();
    this._unbindSocketListeners();
    this._messagesApi.close();
    this._socket = null;
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

  private _getOldMessages(): void {
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

  private _bindSocketListeners(socket: WebSocket, chatId: number): void {
    this._onOpen = () => {
      this._getOldMessages();
      this._startPing();
    };

    this._onMessage = (event: MessageEvent) => {
      this._handleMessage(String(event.data), chatId);
    };

    this._onClose = () => {
      this._stopPing();
    };

    this._onError = (_event: Event) => {};

    socket.addEventListener('open', this._onOpen);
    socket.addEventListener('message', this._onMessage);
    socket.addEventListener('close', this._onClose);
    socket.addEventListener('error', this._onError);
  }

  private _unbindSocketListeners(): void {
    if (!this._socket) {
      return;
    }

    if (this._onOpen) {
      this._socket.removeEventListener('open', this._onOpen);
    }
    if (this._onMessage) {
      this._socket.removeEventListener('message', this._onMessage);
    }
    if (this._onClose) {
      this._socket.removeEventListener('close', this._onClose);
    }
    if (this._onError) {
      this._socket.removeEventListener('error', this._onError);
    }

    this._onOpen = null;
    this._onMessage = null;
    this._onClose = null;
    this._onError = null;
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
