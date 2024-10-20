/**
 * Capitalizes the first letter of each word in a given string.
 *
 * @param {string} str - The input string to be capitalized.
 * @returns {string} - The capitalized string.
 */
export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
