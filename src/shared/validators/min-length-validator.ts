import { InputValidator } from '../../types/input-validator.type.ts';

export const minLengthValidator: InputValidator<[number]> = (len) => {
  return (value: string) => {
    return value.length >= len;
  };
};
