import { ActiveChat } from '../../../api/chats-api.ts';
import { Block, type BlockProps, Store, StoreEvents } from '../../../core';
import { Button } from '../../../shared/components/button';

import template from './ChatHeader.hbs';

export type ChatHeaderProps = BlockProps & {
  title: string;
  children?: {
    deleteButton: Button;
  };
};

export class ChatHeader extends Block<ChatHeaderProps> {
  private readonly _store = new Store();

  constructor(props: ChatHeaderProps) {
    const defaultChildren = {
      deleteButton: new Button({
        title: 'Удалить чат',
        type: 'button',
        color: 'danger',
        events: {
          click: () => {
            console.log('Удалить чат');
          },
        },
        settings: {
          withInternalID: true,
        },
      }),
    };

    super({
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
    const { activeChat } = this._store.getState() as { activeChat?: ActiveChat };
    const { deleteButton } = this.children;
    if (!activeChat) {
      deleteButton.setProps({ disabled: true });
      return;
    }

    deleteButton.setProps({ disabled: false });

    this.setProps({
      title: activeChat.title,
    });
  };
}
