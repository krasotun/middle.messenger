import { Block, type BlockProps } from '../../../core';

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
  constructor(props: ButtonProps) {
    super({
      disabled: false,
      ...props,
    });
  }

  disable(): void {
    this.setProps({ disabled: true });
  }

  enable(): void {
    this.setProps({ disabled: false });
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
