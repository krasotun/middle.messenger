import { User, UserChangePasswordRequest, UserChangeProfileRequest } from '../model/User.ts';

import { BaseApi } from './base-api.ts';


export class UsersApi extends BaseApi {
  changeProfile(data: UserChangeProfileRequest) {
    return this.put('/user/profile', { data });
  }

  changePassword(data: UserChangePasswordRequest) {
    return this.put('/user/password', { data });
  }

  searchUser(login: string) {
    return this.post('/user/search', { data: { login } }) as Promise<User[]>;
  }
}
