import { Block, BlockProps } from '../../core/Block.ts';

import template from './Messenger.hbs';

import './Messenger.css';

export type MessengerProps = BlockProps;

export class Messenger extends Block<MessengerProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
