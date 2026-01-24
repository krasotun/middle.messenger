import { InputValidator } from '../../types/input-validator.type.ts';

export const emptyValueValidator: InputValidator = () => {
  function emptyValue(value: string) {
    return value.length === 0;
  }

  return emptyValue;
};
