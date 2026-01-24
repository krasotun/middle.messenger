import { InputValidator } from '../../types/input-validator.type.ts';

/**
 * Validates an email address so that:
 * - Contains Latin letters, digits, hyphen, and underscore.
 * - Must have exactly one '@' symbol.
 * - Must have at least one '.' after '@'.
 * - Letters must be present before the '.' after '@'.
 * - No spaces or other unsupported characters.
 *
 * @param {string} value - Input string to validate.
 * @returns {boolean} True if the string matches email rules, otherwise false.
 */
export const emailValidator: InputValidator = () => {
  function email(value: string) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(value);
  }

  return email;
};
