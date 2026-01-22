import { SignInform } from '../../components/sign-in-form/SignInForm.ts';
import { Block, BlockProps } from '../../core/Block.ts';

import template from './SignInPage.hbs';

import './SignInPage.css';

export type SignInPageProps = BlockProps & {
  children: {
    signInForm: SignInform;
  };
};

export class SignInPage extends Block<SignInPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
