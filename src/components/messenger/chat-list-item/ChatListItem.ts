import { ActiveChat, Chat } from '../../../api/chats-api.ts';
import { ChatsController } from '../../../controllers';
import { Block, type BlockProps } from '../../../core';

import template from './ChatListItem.hbs';

export type ChatListItemProps = BlockProps & {
  id: Chat['id'];
  title: string;
  lastMessage?: string | null;
  time?: string;
  unreadCount?: number;
  isActive?: boolean;
};

export class ChatListItem extends Block<ChatListItemProps> {
  private readonly _chatsController = new ChatsController();

  constructor(props: ChatListItemProps) {
    super({
      ...props,
      events: {
        ...(props.events ?? {}),
        click: (event: Event) => {
          this._handleClick(event);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _handleClick(_event: Event) {
    const { id, title } = this.props;
    const activeChat: ActiveChat = { id, title };
    this._chatsController.setActiveChat(activeChat);
  }
}
