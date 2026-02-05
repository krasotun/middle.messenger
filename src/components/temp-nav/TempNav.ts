import { Block } from '../../core';

import template from './TempNav.hbs';

import './TempNav.css';

export default class TempNav extends Block {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}
