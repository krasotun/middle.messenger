import { Messenger } from '../../components/messenger';
import { UsersController } from '../../controllers';
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
  const { activeChat, chats } = state;
  return { activeChat, chats };
};
const ConnectedMessenger = connect(Messenger, mapStateToProps);

export class MainPage extends Block<MainPageProps> {
  private readonly _usersController = new UsersController();

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

  protected componentDidMount(): void {
    void this._usersController.loadUserData();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
