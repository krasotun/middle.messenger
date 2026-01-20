import { Block, type BlockProps } from '../../../core/Block.ts';

import template from './Button.hbs';
import './Button.css';

type ButtonProps = BlockProps & {
  title: string;
  events: {
    click: (event: Event) => void;
  };
};

export class Button extends Block<ButtonProps> {
  render(): string {
    console.log(this);
    return template(this.props);
  }
}
