import { Messenger } from '../../components/messenger/Messenger.ts';
import { Block, BlockProps } from '../../core/Block.ts';

import template from './main-page.hbs';

import './MainPage.css';

export type MainPageProps = BlockProps & {
  children: {
    messenger: Messenger;
  };
};

export class MainPage extends Block<MainPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

export const createMainPage = () =>
  new MainPage({
    children: {
      messenger: new Messenger({
        settings: {
          withInternalID: true,
        },
      }),
    },
  });
