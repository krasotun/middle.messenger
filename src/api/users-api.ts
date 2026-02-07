import { UserChangePassword, UserProfile } from './auth-api.ts';
import { BaseApi } from './base-api.ts';

export class UsersApi extends BaseApi {
  changeProfile(data: UserProfile) {
    return this.put('/user/profile', { data });
  }

  changePassword(data: UserChangePassword) {
    return this.put('/user/password', { data });
  }
}
