import { Messenger } from '../../components/messenger/Messenger.ts';
import { MessengerSendMessageForm } from '../../components/messenger/send-message-form/MessengerSendMessageForm.ts';
import { Block, BlockProps } from '../../core/Block.ts';
import { Button } from '../../shared/components/button/Button.ts';
import { Input } from '../../shared/components/input/Input.ts';
import { requiredValidator } from '../../shared/validators';

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
        children: {
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
  });
