import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import { Link } from '../../shared/components/link/Link.ts';

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
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
