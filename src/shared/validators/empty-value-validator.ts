import { InputValidator } from '../../types/input-validator.type.ts';

export const emptyValueValidator: InputValidator = () => {
  return (value: string) => {
    return value.length === 0;
  };
};
