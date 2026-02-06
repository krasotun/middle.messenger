import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';

import template from './ChangePasswordForm.hbs';

import './ChangePasswordForm.css';

export type ChangePasswordFormProps = BlockProps & {
  children: {
    oldPasswordInput: Input;
    newPasswordInput: Input;
    submitButton: Button;
    cancelButton: Button;
  };
};

export class ChangePasswordForm extends Block<ChangePasswordFormProps> {
  constructor(props: ChangePasswordFormProps) {
    super({
      ...props,
      events: {
        ...(props.events ?? {}),
      },
    });

    this._setHandlers();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _setHandlers(): void {
    this.setProps({
      events: {
        ...(this.props.events ?? {}),
        submit: this._handleSubmit,
      },
    });
  }

  private _handleSubmit = (event: Event) => {
    event.preventDefault();
    const inputs = Object.values(this.children).filter((child) => child instanceof Input);
    let isValid = true;
    for (const input of inputs) {
      if (!input.validate()) {
        isValid = false;
      }
    }

    if (!isValid) {
      console.log('Данные не валидны');
      return;
    }

    const values = Object.fromEntries(inputs.map((input) => [input.name, input.value]));

    console.log({
      ...values,
    });
  };
}
