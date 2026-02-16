import { Messenger } from '../../components/messenger';
import { Block, type BlockProps, connect } from '../../core';
import type { AppState } from '../../core/Store.ts';

import template from './main-page.hbs';

import './MainPage.css';

export type MainPageProps = BlockProps & {
  children: {
    messenger: Messenger;
  };
};

const mapStateToProps = (state: AppState) => {
  const { activeChat } = state;
  return { activeChat };
};
const ConnectedMessenger = connect(Messenger, mapStateToProps);

export class MainPage extends Block<MainPageProps> {
  constructor() {
    super({
      children: {
        messenger: new ConnectedMessenger({
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
