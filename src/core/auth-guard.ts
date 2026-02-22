import { Routes } from './Router.ts';
import { Store } from './Store.ts';

export function createRequireAuthGuard(store: Store, redirectTo: string = Routes.SignInPage) {
  return (_pathName: string) => {
    const isAuthed = Boolean(store.getState().userProfile);
    return isAuthed ? null : redirectTo;
  };
}
