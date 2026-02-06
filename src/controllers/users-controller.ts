import { AuthApi, UserCreate, UserCredentials } from '../api';
import { Router, Routes, Store } from '../core';

export class UsersController {
  private readonly _authApi = new AuthApi();
  private readonly _router = new Router();
  private readonly _store = new Store();

  registerUser(data: UserCreate) {
    this._authApi
      .signUp(data)
      .then(() => {
        console.log('Регистрация успешна');
        this._router.go(Routes.SignInPage);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }

  authorizeUser(data: UserCredentials) {
    this._authApi
      .signIn(data)
      .then(() => {
        console.log('Авторизация успешна');
        this._router.go(Routes.MainPage);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }

  getUserInfo() {
    this._authApi
      .getUserInfo()
      .then((userInfo) => {
        this._store.set('userInfo', userInfo);
      })
      .catch(console.log);
  }
}
