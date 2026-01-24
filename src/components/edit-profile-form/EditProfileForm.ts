import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';

import template from './EditProfileForm.hbs';

import './EditProfileForm.css';

export type EditProfileFormProps = BlockProps & {
  children: {
    firstNameInput: Input;
    secondNameInput: Input;
    displayNameInput: Input;
    loginInput: Input;
    emailInput: Input;
    phoneInput: Input;
    avatarInput: Input;
    oldPasswordInput: Input;
    newPasswordInput: Input;
    submitButton: Button;
    cancelButton: Button;
  };
};

export class EditProfileForm extends Block<EditProfileFormProps> {
  constructor(props: EditProfileFormProps) {
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
    const validatedInputs = inputs.filter((input) => input.name !== 'avatar');
    let isValid = true;
    for (const input of validatedInputs) {
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
