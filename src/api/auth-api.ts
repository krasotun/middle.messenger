import { Nullable } from '../types/nullable.type.ts';

import { BaseApi } from './base-api';

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: Nullable<string>;
  login: string;
  email: string;
  phone: string;
  avatar?: Nullable<string>;
};

export type UserCreate = Omit<User, 'id' | 'display_name' | 'avatar'> & {
  password: string;
};

export type UserCredentials = Pick<UserCreate, 'login' | 'password'>;

export type UserProfile = Pick<
  User,
  'first_name' | 'second_name' | 'display_name' | 'login' | 'email' | 'phone'
>;

export class AuthApi extends BaseApi {
  signUp(data: UserCreate) {
    return this.post('/auth/signup', { data });
  }

  signIn(data: UserCredentials) {
    return this.post('/auth/signin', { data });
  }

  getUser() {
    return this.get('/auth/user') as Promise<User>;
  }

  logout() {
    return this.post('/auth/logout', {});
  }
}
