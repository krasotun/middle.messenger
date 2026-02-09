import { Block, type BlockProps } from '../../../core';
import { Button } from '../../../shared/components/button';

import template from './ChatHeader.hbs';

export type ChatHeaderProps = BlockProps & {
  title: string;
  children?: {
    deleteButton: Button;
  };
};

export class ChatHeader extends Block<ChatHeaderProps> {
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
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
