import { Nullable } from '../types/nullable.type.ts';

import { EventBus } from './EventBus.ts';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private static _instance: Nullable<Store> = null;

  private readonly _state: Record<string, unknown> = {};

  constructor() {
    super();
    if (Store._instance) {
      return Store._instance;
    }

    this.listeners.set(StoreEvents.Updated, []);
    Store._instance = this;
  }

  set(key: string, data: unknown) {
    this._state[key] = data;
    this.emit(StoreEvents.Updated);
  }

  getState() {
    return this._state;
  }
}
