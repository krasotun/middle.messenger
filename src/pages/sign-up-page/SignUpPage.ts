import { SignUpForm } from '../../components/sign-up-form';
import { Block, type BlockProps } from '../../core';

import template from './sign-up-page.hbs';

import './SignUpPage.css';

export type SignUpPageProps = BlockProps & {
  children: {
    signUpForm: SignUpForm;
  };
};

export class SignUpPage extends Block<SignUpPageProps> {
  constructor() {
    super({
      children: {
        signUpForm: new SignUpForm({
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as SignUpPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
