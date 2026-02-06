import { BaseApi } from './base-api';

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string | null;
  login: string;
  email: string;
  phone: string;
  avatar?: string | null;
};

export type UserCreate = Omit<User, 'id' | 'display_name' | 'avatar'> & {
  password: string;
};

export type UserCredentials = Pick<UserCreate, 'login' | 'password'>;

export class AuthApi extends BaseApi {
  signUp(data: UserCreate) {
    return this.post('/auth/signup', { data });
  }

  signIn(data: UserCredentials) {
    return this.post('/auth/signin', { data });
  }

  getUserInfo() {
    return this.get('/auth/user') as Promise<User>;
  }
}
