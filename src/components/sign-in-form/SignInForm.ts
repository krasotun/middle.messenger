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

export class SignInform extends Block<SignInFormProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
