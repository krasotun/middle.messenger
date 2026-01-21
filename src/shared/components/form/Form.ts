import { Block } from '../../../core/Block.ts';
import { Button } from '../button/Button.ts';

import template from './Form.hbs';
import './Form.css';

type FormProps = {
  title: string;
  children: {
    submitButton: Button;
  };
};

export class Form extends Block<FormProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
