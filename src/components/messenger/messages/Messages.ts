import { Block, type BlockProps, Store, StoreEvents } from '../../../core';

type MessageItem = {
  content: string;
  time: string;
  isOutgoing: boolean;
};

type MessagesState = Record<number, Array<{ content?: string; time?: string; user_id?: number }>>;

import template from './Messages.hbs';
import './Messages.css';

export type MessagesProps = BlockProps & {
  items?: MessageItem[];
};

export class Messages extends Block<MessagesProps> {
  private readonly _store = new Store();

  constructor(props: MessagesProps = {}) {
    super({
      items: [],
      ...props,
    });

    this._store.on(StoreEvents.Updated, this._syncMessages);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _syncMessages = () => {
    const { messages, activeChat, userProfile } = this._store.getState() as {
      messages?: MessagesState;
      activeChat?: { id: number } | null;
      userProfile?: { id: number } | null;
    };

    if (!activeChat || !messages) {
      this.setProps({ items: [] });
      return;
    }

    const list = messages[activeChat.id] ?? [];
    const userId = userProfile?.id;
    const items = list.map((message) => {
      const messageUserId = message.user_id === undefined ? null : message.user_id;
      const currentUserId = userId === undefined ? null : userId;
      return {
        content: message.content ?? '',
        time: message.time ? this._formatTime(message.time) : '',
        isOutgoing: currentUserId !== null && messageUserId === currentUserId,
      };
    });

    this.setProps({ items });
  };

  private _formatTime(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
}
