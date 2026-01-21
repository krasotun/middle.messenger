import { Block, type BlockProps } from '../../../core/Block.ts';

import template from './Link.hbs';
import './Link.css';

type LinkProps = BlockProps & {
  title: string;
  href: string;
};

export class Link extends Block<LinkProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
