import {
  User,
  UserChangePasswordRequest,
  UserChangeProfileRequest,
  UserSearchRequest,
} from '../model/User.ts';

import { BaseApi } from './base-api.ts';

export class UsersApi extends BaseApi {
  changeProfile(data: UserChangeProfileRequest): Promise<User> {
    return this.put('/user/profile', { data }) as Promise<User>;
  }

  changePassword(data: UserChangePasswordRequest) {
    return this.put('/user/password', { data });
  }

  searchUser(data: UserSearchRequest) {
    return this.post('/user/search', { data }) as Promise<User[]>;
  }
}
