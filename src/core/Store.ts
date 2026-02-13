import { ActiveChat, Chat } from '../api/chats-api.ts';
import { Message } from '../controllers/messages-controller.ts';
import { User } from '../model/User.ts';
import { Nullable } from '../types/nullable.type.ts';

import { EventBus } from './EventBus.ts';

export enum StoreEvents {
  Updated = 'updated',
}

export type AppState = {
  userProfile?: User;
  activeChat?: ActiveChat | null;
  chats?: Chat[];
  messages?: Record<number, Message[]>;
  messagesUpdatedAt?: number;
};

export class Store extends EventBus {
  private static _instance: Nullable<Store> = null;

  private _state: AppState = {};

  constructor() {
    super();
    if (Store._instance) {
      return Store._instance;
    }

    this.listeners.set(StoreEvents.Updated, []);
    Store._instance = this;
  }

  set<K extends keyof AppState>(key: K, data: AppState[K]) {
    this._state[key] = data;
    this.emit(StoreEvents.Updated);
  }

  getState() {
    return this._state;
  }

  resetState() {
    this._state = {};
  }
}
