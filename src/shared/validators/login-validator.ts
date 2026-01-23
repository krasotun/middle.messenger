import { InputValidator } from '../../types/input-validator.type.ts';

/**
 * Validates a login so that:
 * - Contains only Latin letters, digits, hyphen, and underscore.
 * - Does not consist entirely of digits.
 * - No spaces or other special characters.
 *
 * @param {string} value - Input string to validate.
 * @returns {boolean} True if the string matches the login rules, otherwise false.
 */
export const loginValidator: InputValidator<string> = () => {
  return (value) => {
    const re = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    return re.test(value);
  };
};
