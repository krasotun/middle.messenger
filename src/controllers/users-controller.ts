import {
  AuthApi,
  UserChangePassword,
  UserCreate,
  UserCredentials,
  UserProfile,
  UsersApi,
} from '../api';
import { ChangePasswordFormValue } from '../components/change-password-form';
import { SignInFormValue } from '../components/sign-in-form';
import { SignUpFormValue } from '../components/sign-up-form';
import { Router, Routes, Store } from '../core';

import { ChatsController } from './chats-controller.ts';

export class UsersController {
  private readonly _authApi = new AuthApi();
  private readonly _usersApi = new UsersApi();
  private readonly _router = new Router();
  private readonly _store = new Store();
  private readonly _chatsController = new ChatsController();

  async signUpUser(value: SignUpFormValue) {
    try {
      const payload = this._prepareUserSignUpPayload(value);
      await this._authApi.signUpUser(payload);

      console.log('Регистрация успешна');

      this._router.go(Routes.SignInPage);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async signInUser(value: SignInFormValue) {
    try {
      const payload = this._prepareUserSignInPayload(value);
      await this._authApi.signInUser(payload);
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

  async changePassword(value: UserChangePassword) {
    try {
      const payload = this._prepareChanngePasswordPayload(value);
      await this._usersApi.changePassword(payload);
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

  private _prepareUserSignInPayload(value: SignInFormValue): UserCredentials {
    return {
      login: value.login,
      password: value.password,
    };
  }

  private _prepareChanngePasswordPayload(value: ChangePasswordFormValue): UserChangePassword {
    return {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    };
  }
}
