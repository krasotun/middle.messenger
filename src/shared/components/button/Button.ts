import { Block, type BlockProps } from '../../../core/Block.ts';

import template from './Button.hbs';
import './Button.css';

type ButtonProps = BlockProps & {
  title: string;
  type: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  events?: {
    click?: (event: Event) => void;
  };
  disabled?: boolean;
};

export class Button extends Block<ButtonProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
