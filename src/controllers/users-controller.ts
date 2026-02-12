import {
  AuthApi,
  UserChangePassword,
  UserCreate,
  UserCredentials,
  UserProfile,
  UsersApi,
} from '../api';
import { SignUpFormValue } from '../components/sign-up-form';
import { Router, Routes, Store } from '../core';

import { ChatsController } from './chats-controller.ts';

export class UsersController {
  private readonly _authApi = new AuthApi();
  private readonly _usersApi = new UsersApi();
  private readonly _router = new Router();
  private readonly _store = new Store();
  private readonly _chatsController = new ChatsController();

  async signUp(value: SignUpFormValue) {
    try {
      const payload = this._prepareUserSignUpPayload(value);
      await this._authApi.signUp(payload);

      console.log('Регистрация успешна');

      this._router.go(Routes.SignInPage);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async authorize(data: UserCredentials) {
    try {
      await this._authApi.signIn(data);
      console.log('Авторизация успешна');

      this._router.go(Routes.MainPage);

      await this.loadData();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async loadData() {
    try {
      const userInfo = await this._authApi.getUser();
      this._store.set('userProfile', userInfo);

      this._chatsController.ensureActiveChatConnection();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  logout() {
    this._authApi
      .logout()
      .then(() => {
        this._store.resetState();
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

  async changePassword(data: UserChangePassword) {
    try {
      await this._usersApi.changePassword(data);
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this._router.back();
  }

  private _prepareUserSignUpPayload(value: SignUpFormValue): UserCreate {
    return {
      first_name: value.firstName,
      second_name: value.secondName,
      login: value.login,
      email: value.email,
      password: value.password,
      phone: value.phone,
    };
  }
}
