/**
 * Returns the key for the specified value in an object.
 * @param {string | number | object} value - The value to search for.
 * @param {Record<string, string | number>} obj - The object to search within.
 * @returns {string | null} - Returns the key if found, otherwise null.
 */
export const getKeyByValue = (
  value: string | number | object,
  obj: Record<string, string | number>
): string | null => {
  for (let key in obj) {
    if (obj[key] === value) {
      return key;
    }
  }
  return null; // Return null if value is not found
};
