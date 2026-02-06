import { BaseApi } from './base-api';

export type UserData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserLoginAndPassword = Pick<UserData, 'login' | 'password'>;

export class AuthApi extends BaseApi {
  signUp(data: UserData) {
    return this.post('/auth/signup', { data, withCredentials: true });
  }

  signIn(data: UserLoginAndPassword) {
    return this.post('/auth/signin', { data, withCredentials: true });
  }

  getUserInfo() {
    return this.get('/auth/user');
  }
}
