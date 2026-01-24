import { Block } from '../../core';

import template from './TempNav.hbs';

import './TempNav.css';

class TempNav extends Block {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

const navigationMenu = new TempNav();

export default navigationMenu;
