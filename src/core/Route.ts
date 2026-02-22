import { isEqual, renderToDom } from '../shared/utils';
import { Nullable } from '../types/nullable.type.ts';

import { Block, BlockProps } from './Block.ts';

export type BlockConstructor = new (props: BlockProps) => Block;
export type RouteGuard = (pathName: string) => string | null;

export class Route {
  private _block: Nullable<Block> = null;

  constructor(
    private _pathName: string,
    private _viewClass: BlockConstructor,
    private _props?: BlockProps,
    private _guard?: RouteGuard,
  ) {}

  render(): void {
    if (!this._block) {
      this._block = new this._viewClass(this._props ?? {});
      renderToDom(this._block.element);
      this._block.dispatchComponentDidMount();
    }
  }

  leave() {
    if (!this._block) {
      return;
    }

    this._block.remove();
    this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathName);
  }

  guard(pathname: string) {
    return this._guard ? this._guard(pathname) : null;
  }
}
