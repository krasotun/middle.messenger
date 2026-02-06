import { ChangePasswordForm } from '../../components/change-password-form';
import { Block, type BlockProps } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { maxLengthValidator, minLengthValidator, passwordValidator } from '../../shared/validators';

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
          children: {
            oldPasswordInput: new Input({
              name: 'oldPassword',
              label: 'Старый пароль',
              type: 'password',
              validators: [passwordValidator(), minLengthValidator(8), maxLengthValidator(40)],
              settings: {
                withInternalID: true,
              },
            }),
            newPasswordInput: new Input({
              name: 'newPassword',
              label: 'Новый пароль',
              type: 'password',
              validators: [passwordValidator(), minLengthValidator(8), maxLengthValidator(40)],
              settings: {
                withInternalID: true,
              },
            }),
            submitButton: new Button({
              color: 'primary',
              type: 'submit',
              title: 'Сохранить',
              settings: {
                withInternalID: true,
              },
            }),
            cancelButton: new Button({
              color: 'secondary',
              type: 'button',
              title: 'Отменить изменения',
              settings: {
                withInternalID: true,
              },
            }),
          },
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
