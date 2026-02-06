import { Messenger } from '../../components/messenger';
import { MessengerSendMessageForm } from '../../components/messenger/send-message-form';
import { Block, type BlockProps, Router, Routes } from '../../core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { requiredValidator } from '../../shared/validators';

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
          children: {
            editProfileButton: new Button({
              title: 'Редактировать профиль',
              type: 'button',
              color: 'secondary',
              events: {
                click: () => {
                  new Router().go(Routes.EditProfilePage);
                },
              },
              settings: {
                withInternalID: true,
              },
            }),
            sendMessageForm: new MessengerSendMessageForm({
              children: {
                messageInput: new Input({
                  name: 'message',
                  label: 'Сообщение',
                  type: 'text',
                  placeholder: 'Сообщение',
                  validators: [requiredValidator()],
                  settings: {
                    withInternalID: true,
                  },
                }),
                sendButton: new Button({
                  title: 'Отправить',
                  type: 'submit',
                  color: 'primary',
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
