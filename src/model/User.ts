import { Nullable } from '../types/nullable.type.ts';

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: Nullable<string>;
  login: string;
  email: string;
  phone: string;
  avatar: Nullable<string>;
};

export type UserSignUpRequest = Pick<
  User,
  'first_name' | 'second_name' | 'login' | 'email' | 'phone'
> & {
  password: string;
};

export type UserSignInRequest = Pick<UserSignUpRequest, 'login' | 'password'>;

export type UserChangeProfileRequest = Pick<
  User,
  'first_name' | 'second_name' | 'display_name' | 'login' | 'email' | 'phone'
>;

export type UserChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
