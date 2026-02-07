import { Block, type BlockProps } from '../../../core';
import { Router } from '../../../core/Router.ts';

import template from './Link.hbs';
import './Link.css';

type LinkProps = BlockProps & {
  title: string;
  href: string;
  disabled?: boolean;
  events?: {
    click?: (event: Event) => void;
  };
};

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      disabled: false,
      ...props,
      events: {
        ...(props.events ?? {}),
      },
    });

    this._setHandlers();
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  private _setHandlers(): void {
    this.setProps({
      events: {
        ...(this.props.events ?? {}),
        click: this._handleClick,
      },
    });
  }

  private _handleClick = (event: Event): void => {
    event.preventDefault();

    const { href, disabled } = this.props;

    if (disabled) {
      return;
    }

    if (!href.startsWith('/')) {
      return;
    }

    new Router().go(href);
  };
}
