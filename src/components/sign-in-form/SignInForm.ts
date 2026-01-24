import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import { Link } from '../../shared/components/link/Link.ts';

import template from './SignInForm.hbs';

import './SignInForm.css';

export type SignInFormProps = BlockProps & {
  children: {
    loginInput: Input;
    passwordInput: Input;
    submitButton: Button;
    signUpLink: Link;
  };
};

export class SignInForm extends Block<SignInFormProps> {
  constructor(props: SignInFormProps) {
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
    const { loginInput, passwordInput } = this.children as SignInFormProps['children'];
    const isLoginValid = loginInput.validate();
    const isPasswordValid = passwordInput.validate();

    if (!isLoginValid || !isPasswordValid) {
      console.log('Данные не валидны');
      return;
    }

    const values = {
      [loginInput.name]: loginInput.value,
      [passwordInput.name]: passwordInput.value,
    };

    console.log({
      ...values,
    });
  };
}
