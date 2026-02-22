import {
  User,
  UserChangePasswordRequest,
  UserChangeProfileRequest,
  UserSearchRequest,
} from '../model/User.ts';

import { BaseApi } from './base-api.ts';

export class UsersApi extends BaseApi {
  changeProfile(data: UserChangeProfileRequest): Promise<User> {
    return this.put<User>('/user/profile', { data });
  }

  changePassword(data: UserChangePasswordRequest) {
    return this.put('/user/password', { data });
  }

  changeAvatar(data: FormData): Promise<User> {
    return this.put<User>('/user/profile/avatar', { data });
  }

  searchUsers(data: UserSearchRequest) {
    return this.post<User[]>('/user/search', { data });
  }
}
