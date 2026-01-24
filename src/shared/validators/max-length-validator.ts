import { InputValidator } from '../../types/input-validator.type.ts';

export const maxLengthValidator: InputValidator<[number]> = (len) => {
  function maxLength(value: string) {
    return value.length <= len;
  }

  return maxLength;
};
