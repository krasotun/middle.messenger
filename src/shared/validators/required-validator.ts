import { InputValidator } from '../../types/input-validator.type.ts';

/**
 * Validates a value so that:
 * - Not empty.
 *
 * @param {string} value - Input string to validate.
 * @returns {boolean} True if the string is not empty, otherwise false.
 */
export const requiredValidator: InputValidator = () => {
  function required(value: string) {
    return value.length > 0;
  }

  return required;
};
