import { Nullable } from '../types/nullable.type.ts';

import { BlockProps } from './Block.ts';
import { BlockConstructor, Route } from './Route.ts';

export enum Routes {
  SignInPage = '/',
  SignUpPage = '/sign-up',
  MainPage = '/main',
  EditProfilePage = '/edit-profile',
  ChangePasswordPage = '/change-password',
}

export class Router {
  private static _instance: Nullable<Router> = null;

  private readonly _routes: Route[] = [];
  private _history = window.history;
  private _currentRoute: Nullable<Route> = null;

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }

    Router._instance = this;
  }

  use(pathName: Routes, block: BlockConstructor, props: BlockProps) {
    const route = new Route(pathName, block, props);

    this._routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const { pathname } = (event.currentTarget as Window).location;
      this._onRoute(pathname);
    };

    this._onRoute(window.location.pathname);
  }

  go(pathName: string) {
    this._history.pushState({}, '', pathName);
    this._onRoute(pathName);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  private _onRoute(pathName: string) {
    const route = this._getRoute(pathName);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}
