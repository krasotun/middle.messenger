import { AuthApi, UserData, UserLoginAndPassword } from '../api';
import { Router, Routes } from '../core';

export class UsersController {
  private readonly _authApi = new AuthApi();
  private readonly _router = new Router();

  registerUser(data: UserData) {
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

  authorizeUser(data: UserLoginAndPassword) {
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
    this._authApi.getUserInfo().then(console.log).catch(console.log);
  }
}
