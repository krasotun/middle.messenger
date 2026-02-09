import { Chat } from '../../../api/chats-api.ts';
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
    const { chats } = this._store.getState() as { chats?: Chat[] };

    if (!Array.isArray(chats)) {
      return;
    }

    const items = chats.map((chat) => {
      return new ChatListItem({
        name: chat.title,
        lastMessage: chat.last_message,
        unreadCount: chat.unread_count,
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
}
