import { Block, type BlockProps } from '../../../core';

import template from './Messages.hbs';

export type MessagesProps = BlockProps;

export class Messages extends Block<MessagesProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
