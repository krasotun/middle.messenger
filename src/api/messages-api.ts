import { BaseApi } from './base-api.ts';

type SocketInit = {
  userId: number;
  chatId: number;
  token: string;
};

export class MessagesApi extends BaseApi {
  private _socket: WebSocket | null = null;

  initConnection({ userId, chatId, token }: SocketInit): WebSocket {
    if (this._socket) {
      this._socket.close();
    }

    const wsBaseUrl = this.baseUrl.replace(/^http/, 'ws').replace(/\/api\/v2$/, '');
    const socket = new WebSocket(
      `${wsBaseUrl}/ws/chats/${String(userId)}/${String(chatId)}/${token}`,
    );
    this._socket = socket;
    return socket;
  }

  close(): void {
    this._socket?.close();
    this._socket = null;
  }
}
