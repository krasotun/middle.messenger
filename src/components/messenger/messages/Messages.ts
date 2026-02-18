import { Block, type BlockProps } from '../../../core';

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
  messages?: MessagesState;
  messagesUpdatedAt?: number;
  activeChat?: { id: number } | null;
  userProfile?: { id: number } | null;
};

export class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps = {}) {
    super({
      items: [],
      messagesUpdatedAt: 0,
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  protected componentDidMount(): void {
    this._syncMessages();
  }

  protected componentDidUpdate(oldProps: MessagesProps, newProps: MessagesProps): boolean {
    if (
      oldProps.messages !== newProps.messages ||
      oldProps.messagesUpdatedAt !== newProps.messagesUpdatedAt ||
      oldProps.activeChat !== newProps.activeChat ||
      oldProps.userProfile !== newProps.userProfile
    ) {
      this._syncMessages();
    }
    return true;
  }

  private _syncMessages = () => {
    const { messages, activeChat, userProfile } = this.props;
    if (!activeChat || !messages) {
      this.setProps({ items: [] });
      return;
    }

    const list = messages[activeChat.id] ?? [];
    const userId = userProfile?.id;
    const items = list
      .map((message, index) => {
        const messageUserId = message.user_id === undefined ? null : message.user_id;
        const currentUserId = userId === undefined ? null : userId;
        const rawTime = message.time ?? '';
        return {
          content: message.content ?? '',
          time: rawTime ? this._formatTime(rawTime) : '',
          rawTime,
          isOutgoing: currentUserId !== null && messageUserId === currentUserId,
          index,
        };
      })
      .sort((a, b) => {
        const timeA = Date.parse(a.rawTime);
        const timeB = Date.parse(b.rawTime);
        const isValidA = Number.isFinite(timeA);
        const isValidB = Number.isFinite(timeB);

        if (isValidA && isValidB) {
          return timeA - timeB;
        }

        if (isValidA) {
          return -1;
        }

        if (isValidB) {
          return 1;
        }

        return a.index - b.index;
      })
      .map(({ content, time, isOutgoing }) => ({ content, time, isOutgoing }));

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
