import { AuthApi, UsersApi } from '../api';
import { ChangePasswordFormValue } from '../components/change-password-form';
import { EditProfileFormValue } from '../components/edit-profile-form';
import { SignInFormValue } from '../components/sign-in-form';
import { SignUpFormValue } from '../components/sign-up-form';
import { Router, Routes, Store } from '../core';
import {
  UserChangePasswordRequest,
  UserSignUpRequest,
  UserSignInRequest,
  UserChangeProfileRequest,
} from '../model/User.ts';

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
      await this._authApi.signUp(payload);

      console.log('Регистрация успешна');

      this._router.go(Routes.SignInPage);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async signInUser(value: SignInFormValue) {
    try {
      const payload = this._prepareUserSignInPayload(value);
      await this._authApi.signIn(payload);
      console.log('Авторизация успешна');

      const loaded = await this.loadUserData();
      if (loaded) {
        this._router.go(Routes.MainPage);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async loadUserData(): Promise<boolean> {
    try {
      const userProfile = await this._authApi.getUser();
      this._store.set('userProfile', userProfile);

      console.log(this._store.getState());

      this._chatsController.ensureActiveChatConnection();
      return true;
    } catch (error: unknown) {
      console.log(error);
      this._store.resetState();
      return false;
    }
  }

  async logout() {
    try {
      await this._authApi.logout();
    } catch (error) {
      console.log(error);
    } finally {
      this._chatsController.disconnect();
      this._store.resetState();
      this._router.go(Routes.SignInPage);
    }
  }

  async changeProfile(value: EditProfileFormValue) {
    try {
      const payload = this._prepareChangeProfiledPayload(value);
      const response = await this._usersApi.changeProfile(payload);
      this._store.set('userProfile', response);
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(value: UserChangePasswordRequest) {
    try {
      const payload = this._prepareChangePasswordPayload(value);
      await this._usersApi.changePassword(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(formData: FormData) {
    try {
      const response = await this._usersApi.changeAvatar(formData);
      this._store.set('userProfile', response);
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this._router.back();
  }

  private _prepareUserSignUpPayload(value: SignUpFormValue): UserSignUpRequest {
    return {
      first_name: value.firstName,
      second_name: value.secondName,
      login: value.login,
      email: value.email,
      password: value.password,
      phone: value.phone,
    };
  }

  private _prepareUserSignInPayload(value: SignInFormValue): UserSignInRequest {
    return {
      login: value.login,
      password: value.password,
    };
  }

  private _prepareChangePasswordPayload(value: ChangePasswordFormValue): UserChangePasswordRequest {
    return {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    };
  }

  private _prepareChangeProfiledPayload(value: EditProfileFormValue): UserChangeProfileRequest {
    return {
      first_name: value.firstName,
      second_name: value.secondName,
      display_name: value.displayName,
      login: value.login,
      email: value.email,
      phone: value.phone,
    };
  }
}
