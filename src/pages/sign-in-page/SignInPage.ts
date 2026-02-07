import { SignInForm } from '../../components/sign-in-form';
import { Block, type BlockProps } from '../../core';

import template from './SignInPage.hbs';

import './SignInPage.css';

export type SignInPageProps = BlockProps & {
  children: {
    signInForm: SignInForm;
  };
};

export class SignInPage extends Block<SignInPageProps> {
  constructor() {
    super({
      children: {
        signInForm: new SignInForm({
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as SignInPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
