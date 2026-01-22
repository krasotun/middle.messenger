import { Block } from '../../core/Block.ts';

import template from './TempNav.hbs';

import './TempNav.css';

class TempNav extends Block {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}

const navigationMenu = new TempNav();

export default navigationMenu;
