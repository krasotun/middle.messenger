import { Block } from '../../core/Block.ts';

import template from './Messenger.hbs';

import './Messenger.css';

export class Messenger extends Block {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
