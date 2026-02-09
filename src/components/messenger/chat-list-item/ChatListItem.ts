import { Block, type BlockProps } from '../../../core';

import template from './ChatListItem.hbs';

export type ChatListItemProps = BlockProps & {
  name: string;
  lastMessage?: string | null;
  time?: string;
  unreadCount?: number;
  isActive?: boolean;
};

export class ChatListItem extends Block<ChatListItemProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
