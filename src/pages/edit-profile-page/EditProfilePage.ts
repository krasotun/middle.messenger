import { EditProfileForm } from '../../components/edit-profile-form';
import { Block, type BlockProps } from '../../core';

import template from './edit-profile-page.hbs';

import './EditProfilePage.css';

export type EditProfilePageProps = BlockProps & {
  children: {
    editProfileForm: EditProfileForm;
  };
};

export class EditProfilePage extends Block<EditProfilePageProps> {
  constructor() {
    super({
      children: {
        editProfileForm: new EditProfileForm({
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as EditProfilePageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
