import { Messenger } from '../../components/messenger';
import { Block, type BlockProps } from '../../core';

import template from './main-page.hbs';

import './MainPage.css';

export type MainPageProps = BlockProps & {
  children: {
    messenger: Messenger;
  };
};

export class MainPage extends Block<MainPageProps> {
  constructor() {
    super({
      children: {
        messenger: new Messenger({
          settings: {
            withInternalID: true,
          },
        }),
      },
    } as MainPageProps);
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
