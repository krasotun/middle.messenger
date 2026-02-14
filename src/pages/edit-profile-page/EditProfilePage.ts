import { EditProfileForm } from '../../components/edit-profile-form';
import { Block, type BlockProps, Router, connect } from '../../core';
import type { AppState } from '../../core/Store.ts';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import {
  emailValidator,
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  nameValidator,
  phoneValidator,
} from '../../shared/validators';

import template from './edit-profile-page.hbs';

import './EditProfilePage.css';

export type EditProfilePageProps = BlockProps & {
  children: {
    editProfileForm: EditProfileForm;
  };
};

const mapStateToProps = (state: AppState) => {
  const { userProfile } = state;
  return { userProfile };
};

const connectedEditProfileForm = connect(EditProfileForm, mapStateToProps);

export class EditProfilePage extends Block<EditProfilePageProps> {
  constructor() {
    super({
      children: {
        editProfileForm: new connectedEditProfileForm({
          children: {
            firstNameInput: new Input({
              name: 'firstName',
              label: 'Имя',
              type: 'text',
              validators: [nameValidator()],
              settings: {
                withInternalID: true,
              },
            }),
            secondNameInput: new Input({
              name: 'secondName',
              label: 'Фамилия',
              type: 'text',
              validators: [nameValidator()],
              settings: {
                withInternalID: true,
              },
            }),
            displayNameInput: new Input({
              name: 'displayName',
              label: 'Отображаемое имя',
              type: 'text',
              validators: [],
              settings: {
                withInternalID: true,
              },
            }),
            loginInput: new Input({
              name: 'login',
              label: 'Логин',
              type: 'text',
              validators: [loginValidator(), minLengthValidator(3), maxLengthValidator(20)],
              settings: {
                withInternalID: true,
              },
            }),
            emailInput: new Input({
              name: 'email',
              label: 'Почта',
              type: 'email',
              validators: [emailValidator()],
              settings: {
                withInternalID: true,
              },
            }),
            phoneInput: new Input({
              name: 'phone',
              label: 'Телефон',
              type: 'tel',
              validators: [phoneValidator(), minLengthValidator(10), maxLengthValidator(15)],
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
              title: 'Вернуться назад',
              events: {
                click: () => {
                  new Router().back();
                },
              },
              settings: {
                withInternalID: true,
              },
            }),
          },
          settings: {
            withInternalID: true,
          },
          events: {},
        }),
      },
    } as EditProfilePageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
