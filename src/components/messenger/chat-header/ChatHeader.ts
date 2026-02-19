import { ChatsController } from '../../../controllers';
import { Block, type BlockProps } from '../../../core';
import { ActiveChat } from '../../../model/Chat.ts';
import { Button } from '../../../shared/components/button';

import template from './ChatHeader.hbs';

import './ChatHeader.css';

export type ChatHeaderProps = BlockProps & {
  title?: string;
  activeChat?: ActiveChat | null;
  children?: {
    deleteButton: Button;
  };
};

export class ChatHeader extends Block<ChatHeaderProps> {
  private readonly _chatsController = new ChatsController();

  constructor(props: BlockProps) {
    const defaultChildren = {
      deleteButton: new Button({
        title: 'Удалить чат',
        type: 'button',
        color: 'danger',
        events: {},
        settings: {
          withInternalID: true,
        },
      }),
    };

    super({
      ...(props as ChatHeaderProps),
      children: {
        ...defaultChildren,
        ...((props as ChatHeaderProps).children ?? {}),
      },
    });

    this._setHandlers();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  protected componentDidMount(): void {
    this._syncActiveChat();
  }

  protected componentDidUpdate(oldProps: ChatHeaderProps, newProps: ChatHeaderProps): boolean {
    if (oldProps.activeChat !== newProps.activeChat) {
      this._syncActiveChat();
    }
    return true;
  }

  private _syncActiveChat = () => {
    const { activeChat } = this.props;
    const { deleteButton } = this.children as { deleteButton?: Button };
    if (!deleteButton) {
      return;
    }

    if (!activeChat) {
      deleteButton.disable();
      this.setProps({
        title: 'Выберите чат',
      });
      return;
    }

    deleteButton.enable();

    this.setProps({
      title: activeChat.title,
    });
  };

  private _setHandlers(): void {
    const { deleteButton } = this.children as { deleteButton?: Button };
    if (!deleteButton) {
      return;
    }
    deleteButton.setProps({
      events: {
        click: this._handleDeleteClick,
      },
    });
  }

  private _handleDeleteClick = () => {
    const { activeChat } = this.props;
    if (!activeChat) {
      return;
    }
    const { deleteButton } = this.children as { deleteButton?: Button };
    if (!deleteButton) {
      return;
    }

    deleteButton.disable();

    this._chatsController
      .deleteChat({ id: activeChat.id })
      .catch(console.log)
      .finally(() => {
        deleteButton.enable();
      });
  };
}
