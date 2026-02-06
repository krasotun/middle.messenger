import { UserCreate } from '../../api';
import { UsersController } from '../../controllers/';
import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';

import template from './SignUpForm.hbs';

import './SignUpForm.css';

export type SignUpFormProps = BlockProps & {
  children: {
    firstNameInput: Input;
    secondNameInput: Input;
    loginInput: Input;
    emailInput: Input;
    passwordInput: Input;
    phoneInput: Input;
    submitButton: Button;
    signInLink: Link;
  };
};

export class SignUpForm extends Block<SignUpFormProps> {
  private readonly _usersController = new UsersController();

  constructor(props: SignUpFormProps) {
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
    const inputs = Object.values(this.children).filter(
      (child): child is Input => child instanceof Input,
    );
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
    this._usersController.registerUser(values as UserCreate);
  };
}
