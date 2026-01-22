import { Block, type BlockProps } from '../../../core/Block.ts';

import template from './Input.hbs';
import './Input.css';

type InputProps = BlockProps & {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'file';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  events?: {
    input?: (event: Event) => void;
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
  };
};

export class Input extends Block<InputProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
