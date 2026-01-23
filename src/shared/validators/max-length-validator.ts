import { InputValidator } from '../../types/input-validator.type.ts';

export const maxLengthValidator: InputValidator<[number]> = (len: number) => {
  return (value: string) => {
    return value.length <= len;
  };
};
