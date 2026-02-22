import { ChatsController } from '../../../controllers';
import { Block, type BlockProps } from '../../../core';
import { ActiveChat, Chat } from '../../../model/Chat.ts';
import { Nullable } from '../../../types/nullable.type.ts';
import { ChatListItem } from '../chat-list-item';

import template from './ChatList.hbs';

import './ChatList.css';

export type ChatListProps = BlockProps & {
  chats?: Chat[];
  activeChat?: Nullable<ActiveChat>;
};

export class ChatList extends Block<ChatListProps> {
  private readonly _chatsController = new ChatsController();

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  protected componentDidMount(): void {
    this._chatsController.loadChats().catch(console.log);
    this._syncChats();
  }

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    if (oldProps.chats !== newProps.chats || oldProps.activeChat !== newProps.activeChat) {
      this._syncChats();
    }
    return true;
  }

  private _syncChats(): void {
    const { chats, activeChat } = this.props;

    if (!Array.isArray(chats)) {
      this.setProps({ children: { chats: [] } });
      return;
    }

    const items = chats.map((chat) => {
      const lastMessage = chat.last_message?.content ?? null;
      const time = chat.last_message?.time ? this._formatTime(chat.last_message.time) : undefined;
      return new ChatListItem({
        id: chat.id,
        title: chat.title,
        lastMessage,
        time,
        unreadCount: chat.unread_count,
        isActive: activeChat?.id === chat.id,
        settings: {
          withInternalID: true,
        },
      });
    });

    this.setProps({ children: { chats: items } });
  }

  private _formatTime(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
}
