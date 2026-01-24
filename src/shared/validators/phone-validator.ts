import { InputValidator } from '../../types/input-validator.type.ts';

/**
 * Validates a phone number so that:
 * - Contains only digits.
 * - May start with a plus sign.
 *
 * @param {string} value - Input string to validate.
 * @returns {boolean} True if the string matches phone rules, otherwise false.
 */
export const phoneValidator: InputValidator = () => {
  function phone(value: string) {
    const re = /^\+?\d+$/;
    return re.test(value);
  }

  return phone;
};
