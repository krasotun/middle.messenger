import { Block, BlockProps } from '../../core/Block.ts';
import { ErrorPage } from '../../shared/components/error-page/ErrorPage.ts';

import template from './NotFoundPage.hbs';

import './NotFoundPage.css';

export type NotFoundPageProps = BlockProps & {
  children: {
    errorPage: ErrorPage;
  };
};

export class NotFoundPage extends Block<NotFoundPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

export const createNotFoundPage = () =>
  new NotFoundPage({
    children: {
      errorPage: new ErrorPage({
        code: '404',
        title: 'Страница не найдена',
        text: 'Возможно, ссылка устарела или страница была удалена.',
        linkTitle: 'На главную',
        linkHref: '/index.html',
        settings: {
          withInternalID: true,
        },
      }),
    },
  });
