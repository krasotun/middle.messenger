import { Block } from '../../../core/Block.ts';

import template from './Button.hbs';
import './Button.css';

type ButtonProps = {
  title: string;
  events: {
    click: (event: Event) => void;
  };
};

export class Button extends Block<ButtonProps> {
  render(): string {
    return template(this.props);
  }
}
