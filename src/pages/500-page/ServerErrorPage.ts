import { Block, BlockProps } from '../../core/Block.ts';
import { ErrorPage } from '../../shared/components/error-page/ErrorPage.ts';

import template from './ServerErrorPage.hbs';

import './ServerErrorPage.css';

export type ServerErrorPageProps = BlockProps & {
  children: {
    errorPage: ErrorPage;
  };
};

export class ServerErrorPage extends Block<ServerErrorPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

export const createServerErrorPage = () =>
  new ServerErrorPage({
    children: {
      errorPage: new ErrorPage({
        code: '500',
        title: 'Ошибка сервера',
        text: 'Мы уже работаем над проблемой. Попробуйте позже.',
        linkTitle: 'На главную',
        linkHref: '/index.html',
        settings: {
          withInternalID: true,
        },
      }),
    },
  });
