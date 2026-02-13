import { User, UserSignUpRequest, UserSignInRequest } from '../model/User.ts';

import { BaseApi } from './base-api';
export class AuthApi extends BaseApi {
  signUp(data: UserSignUpRequest) {
    return this.post('/auth/signup', { data });
  }

  signIn(data: UserSignInRequest) {
    return this.post('/auth/signin', { data });
  }

  getUser() {
    return this.get('/auth/user') as Promise<User>;
  }

  logout() {
    return this.post('/auth/logout', {});
  }
}
