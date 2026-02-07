import { ChangePasswordForm } from '../../components/change-password-form';
import { Block, type BlockProps } from '../../core';

import template from './change-password-page.hbs';

import './ChangePasswordPage.css';

export type ChangePasswordPageProps = BlockProps & {
  children: {
    changePasswordForm: ChangePasswordForm;
  };
};

export class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  constructor() {
    super({
      children: {
        changePasswordForm: new ChangePasswordForm({
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as ChangePasswordPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
