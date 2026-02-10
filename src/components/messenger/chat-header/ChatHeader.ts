import { ActiveChat, Chat } from '../../../api/chats-api.ts';
import { ChatsController } from '../../../controllers';
import { Block, type BlockProps, Store, StoreEvents } from '../../../core';
import { Button } from '../../../shared/components/button';

import template from './ChatHeader.hbs';

export type ChatHeaderProps = BlockProps & {
  title: string;
  emptyTitle?: string;
  isVisible?: boolean;
  children?: {
    deleteButton: Button;
  };
};

export class ChatHeader extends Block<ChatHeaderProps> {
  private readonly _store = new Store();
  private readonly _chatsController = new ChatsController();

  constructor(props: ChatHeaderProps) {
    const defaultChildren = {
      deleteButton: new Button({
        title: 'Удалить чат',
        type: 'button',
        color: 'danger',
        events: {
          click: () => {
            const { activeChat } = this._store.getState() as { activeChat?: ActiveChat };
            if (!activeChat) {
              return;
            }
            this._chatsController.deleteChat({ id: activeChat.id }).catch(console.log);
          },
        },
        settings: {
          withInternalID: true,
        },
      }),
    };

    super({
      emptyTitle: 'Выберите чат',
      isVisible: true,
      ...props,
      children: {
        ...defaultChildren,
        ...(props.children ?? {}),
      },
    });

    this._store.on(StoreEvents.Updated, this._syncActiveChat);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _syncActiveChat = () => {
    const { activeChat, chats } = this._store.getState() as {
      activeChat?: ActiveChat | null;
      chats?: Chat[];
    };
    const { deleteButton } = this.children;
    const hasChats = Array.isArray(chats) && chats.length > 0;
    this.setProps({ isVisible: hasChats });
    if (!hasChats) {
      deleteButton.setProps({ disabled: true });
      this.setProps({
        title: this.props.emptyTitle ?? 'Выберите чат',
      });
      return;
    }

    if (!activeChat) {
      deleteButton.setProps({ disabled: true });
      this.setProps({
        title: this.props.emptyTitle ?? 'Выберите чат',
      });
      return;
    }

    deleteButton.setProps({ disabled: false });

    this.setProps({
      title: activeChat.title,
    });
  };
}
