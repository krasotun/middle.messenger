import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';

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
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
