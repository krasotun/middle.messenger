import { ChangeAvatarForm } from '../../components/change-avatar-form';
import { UsersController } from '../../controllers';
import { Block, type BlockProps, connect, Store } from '../../core';
import type { AppState } from '../../core/Store.ts';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';

import template from './change-avatar-page.hbs';

import './ChangeAvatarPage.css';

export type ChangeAvatarPageProps = BlockProps & {
  children: {
    changeAvatarForm: ChangeAvatarForm;
  };
};

const mapStateToProps = (state: AppState) => {
  const { userProfile } = state;
  return { userProfile };
};
const ConnectedChangeAvatarForm = connect(ChangeAvatarForm, mapStateToProps);

export class ChangeAvatarPage extends Block<ChangeAvatarPageProps> {
  private readonly _store = new Store();
  private readonly _usersController = new UsersController();

  constructor() {
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
        const files = value && typeof value !== 'string' ? value : null;
        const hasFile = Boolean(files && files.length > 0);
        submitButton.setProps({ disabled: !hasFile });
      },
      settings: {
        withInternalID: true,
      },
    });

    super({
      children: {
        changeAvatarForm: new ConnectedChangeAvatarForm({
          avatarUrl: null,
          children: {
            avatarInput,
            submitButton,
            cancelButton: new Button({
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
            }),
          },
          events: {},
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as ChangeAvatarPageProps);
  }

  protected componentDidMount(): void {
    const { userProfile } = this._store.getState() as { userProfile?: unknown };
    if (!userProfile) {
      this._usersController.loadUserData().catch(console.log);
    }
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
