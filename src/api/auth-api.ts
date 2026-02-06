import { BaseApi } from './base-api';

export type UserData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class AuthApi extends BaseApi {
  signUp(data: UserData) {
    return this.post('/auth/signup', { data });
  }
}
