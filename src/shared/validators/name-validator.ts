import { InputValidator } from '../../types/input-validator.type.ts';
/**
 * Validates a name so that:
 * - The first character is an uppercase letter (Latin or Cyrillic).
 * - The rest of the characters are letters (any alphabet) or hyphen.
 * - Spaces, digits and other special characters are not allowed.
 *
 * @param {string} value - Input string to validate.
 * @returns {boolean} True if the string matches the name rules, otherwise false.
 */

export const nameValidator: InputValidator = () => {
  function name(value: string) {
    const re = /^[\p{Lu}][\p{L}-]*$/u;
    return re.test(value);
  }

  return name;
};
