import { UsersController } from '../../controllers';
import { BlockProps } from '../../core';
import type { User } from '../../model/User.ts';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';

import template from './ChangeAvatarForm.hbs';

import './ChangeAvatarForm.css';

export type ChangeAvatarFormProps = BlockProps & {
  avatarUrl?: string | null;
  userProfile?: User;
  children?: {
    avatarInput: Input;
    submitButton: Button;
    cancelButton: Button;
  };
};

export type ChangeAvatarFormValue = {
  avatar: FileList | null;
};

export class ChangeAvatarForm extends Form<ChangeAvatarFormValue> {
  private readonly _usersController = new UsersController();

  constructor(props: BlockProps) {
    const submitButton = new Button({
      title: 'Сменить аватар',
      type: 'submit',
      color: 'primary',
      disabled: true,
      settings: {
        withInternalID: true,
      },
    });

    const avatarInput = new Input({
      name: 'avatar',
      label: 'Выберите файл',
      type: 'file',
      onChange: (value) => {
        this._handleAvatarChange(value, submitButton);
      },
      settings: {
        withInternalID: true,
      },
    });

    const cancelButton = new Button({
      color: 'secondary',
      type: 'button',
      title: 'Вернуться назад',
      events: {
        click: () => {
          this._usersController.goBack();
        },
      },
      settings: {
        withInternalID: true,
      },
    });

    super({
      ...(props as ChangeAvatarFormProps),
      children: {
        avatarInput,
        submitButton,
        cancelButton,
      },
      events: {},
    });
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _handleAvatarChange(value: string | FileList | null, submitButton: Button): void {
    const files = value && typeof value !== 'string' ? value : null;
    const hasFile = Boolean(files && files.length > 0);
    if (hasFile) {
      submitButton.enable();
      return;
    }
    submitButton.disable();
  }

  protected componentDidMount(): void {
    this._syncAvatarUrl();
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    const prevProfile = (oldProps as ChangeAvatarFormProps).userProfile;
    const nextProfile = (newProps as ChangeAvatarFormProps).userProfile;
    if (prevProfile !== nextProfile) {
      this._syncAvatarUrl();
    }
    return true;
  }

  protected _handleSubmit(event: Event): void {
    event.preventDefault();
    this._toggleFormDisabled(true);

    const value = this.rawValue;
    const files = value.avatar;
    const formData = new FormData();
    if (!files) {
      this._toggleFormDisabled(false);
      return;
    }

    formData.append('avatar', files[0]);

    this._usersController
      .changeAvatar(formData)
      .catch(console.log)
      .finally(() => {
        this._toggleFormDisabled(false);
        this._resetAllInputs();
      });
  }

  private _syncAvatarUrl(): void {
    const { userProfile } = this.props as ChangeAvatarFormProps;
    if (!userProfile || !userProfile.avatar) {
      this.setProps({ avatarUrl: null });
      return;
    }

    const prefix = 'https://ya-praktikum.tech/api/v2/resources';
    const normalized = userProfile.avatar.startsWith('/')
      ? userProfile.avatar
      : `/${userProfile.avatar}`;
    this.setProps({ avatarUrl: `${prefix}${normalized}` });
  }
}
