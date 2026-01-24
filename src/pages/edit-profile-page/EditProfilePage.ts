import { EditProfileForm } from '../../components/edit-profile-form/EditProfileForm.ts';
import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import {
  emailValidator,
  loginValidator,
  maxLengthValidator,
  minLengthValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../../shared/validators';

import template from './edit-profile-page.hbs';

import './EditProfilePage.css';

export type EditProfilePageProps = BlockProps & {
  children: {
    editProfileForm: EditProfileForm;
  };
};

export class EditProfilePage extends Block<EditProfilePageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

export const createEditProfilePage = () =>
  new EditProfilePage({
    children: {
      editProfileForm: new EditProfileForm({
        children: {
          firstNameInput: new Input({
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            validators: [nameValidator()],
            settings: {
              withInternalID: true,
            },
          }),
          secondNameInput: new Input({
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
            validators: [nameValidator()],
            settings: {
              withInternalID: true,
            },
          }),
          displayNameInput: new Input({
            name: 'display_name',
            label: 'Отображаемое имя',
            type: 'text',
            validators: [nameValidator()],
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
          avatarInput: new Input({
            name: 'avatar',
            label: 'Аватар',
            type: 'file',
            settings: {
              withInternalID: true,
            },
          }),
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
  });
