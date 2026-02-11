import { ActiveChat, Chat } from '../../../api/chats-api.ts';
import { ChatsController } from '../../../controllers';
import { Block, type BlockProps, Store, StoreEvents } from '../../../core';
import { ChatListItem } from '../chat-list-item';

import template from './ChatList.hbs';

export type ChatListProps = BlockProps & {
  children?: {
    items?: ChatListItem[];
  };
};

export class ChatList extends Block {
  private readonly _store = new Store();
  private readonly _chatsController = new ChatsController();
  private _lastMessagesUpdatedAt: number | null = null;
  constructor(props: ChatListProps = {}) {
    super({
      ...props,
      children: {
        items: props.children?.items ?? [],
      },
    });

    this._store.on(StoreEvents.Updated, this._syncChats);

    this._loadChats();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _syncChats = () => {
    const { chats, activeChat, messagesUpdatedAt } = this._store.getState() as {
      chats?: Chat[];
      activeChat?: ActiveChat;
      messagesUpdatedAt?: number;
    };

    if (
      typeof messagesUpdatedAt === 'number' &&
      messagesUpdatedAt !== this._lastMessagesUpdatedAt
    ) {
      this._lastMessagesUpdatedAt = messagesUpdatedAt;
      this._loadChats();
    }

    if (!Array.isArray(chats)) {
      return;
    }

    const items = chats.map((chat) => {
      const lastMessage = chat.last_message?.content ?? null;
      const time = chat.last_message?.time ? this._formatTime(chat.last_message.time) : undefined;
      return new ChatListItem({
        id: chat.id,
        name: chat.title,
        lastMessage,
        time,
        unreadCount: chat.unread_count,
        isActive: activeChat?.id === chat.id,
        settings: {
          withInternalID: true,
        },
      });
    });

    this.setProps({ children: { items } });
  };

  private _loadChats() {
    this._chatsController.loadChats().catch(console.log);
  }

  private _formatTime(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
}
