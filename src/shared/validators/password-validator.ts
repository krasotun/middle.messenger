import { InputValidator } from '../../types/input-validator.type.ts';

/**
 * Validates a password so that:
 * - Contains at least one uppercase letter.
 * - Contains at least one digit.
 *
 * @param {string} value - Input string to validate.
 * @returns {boolean} True if the string matches password rules, otherwise false.
 */
export const passwordValidator: InputValidator = () => {
  function password(value: string) {
    const re = /^(?=.*[A-Z])(?=.*\d).+$/;
    return re.test(value);
  }

  return password;
};
