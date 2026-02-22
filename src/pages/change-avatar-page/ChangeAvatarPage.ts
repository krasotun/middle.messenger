import { ChangeAvatarForm } from '../../components/change-avatar-form';
import { Block, type BlockProps, connect } from '../../core';
import type { AppState } from '../../core/Store.ts';

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
  constructor() {
    super({
      children: {
        changeAvatarForm: new ConnectedChangeAvatarForm({
          avatarUrl: null,
          events: {},
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as ChangeAvatarPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
