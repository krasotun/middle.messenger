import { InputValidator } from '../../types/input-validator.type.ts';

export const minLengthValidator: InputValidator<[number]> = (len) => {
  function minLength(value: string) {
    return value.length >= len;
  }

  return minLength;
};
