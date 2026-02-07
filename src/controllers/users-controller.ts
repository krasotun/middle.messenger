import { AuthApi, UserCreate, UserCredentials, UserProfile, UsersApi } from '../api';
import { Router, Routes, Store } from '../core';

export class UsersController {
  private readonly _authApi = new AuthApi();
  private readonly _usersApi = new UsersApi();
  private readonly _router = new Router();
  private readonly _store = new Store();

  register(data: UserCreate) {
    return this._authApi
      .signUp(data)
      .then(() => {
        console.log('Регистрация успешна');
        this._router.go(Routes.SignInPage);
      })
      .catch((error: unknown) => {
        console.log(error);
        throw error;
      });
  }

  authorize(data: UserCredentials) {
    return this._authApi
      .signIn(data)
      .then(() => {
        console.log('Авторизация успешна');
        this._router.go(Routes.MainPage);
      })
      .then(() => {
        this.loadData();
      })
      .catch((error: unknown) => {
        console.log(error);
        throw error;
      });
  }

  loadData() {
    this._authApi
      .getUser()
      .then((userInfo) => {
        this._store.set('userProfile', userInfo);
      })
      .catch(console.log);
  }

  logout() {
    this._authApi
      .logout()
      .then(() => {
        this._store.set('userProfile', {});
        this._router.go(Routes.SignInPage);
      })
      .catch(console.log);
  }

  async changeProfile(data: UserProfile) {
    try {
      const response = await this._usersApi.changeProfile(data);
      this._store.set('userProfile', response);
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this._router.back();
  }
}
