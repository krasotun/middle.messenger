import { Block, type BlockProps } from '../../../core';

import template from './ErrorPage.hbs';

import './ErrorPage.css';

export type ErrorPageProps = BlockProps & {
  code: string;
  title: string;
  text: string;
  linkTitle: string;
  linkHref: string;
};

export class ErrorPage extends Block<ErrorPageProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
