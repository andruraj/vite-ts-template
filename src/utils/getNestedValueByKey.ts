/**
 * Retrieves the value at a nested key within an object.
 * @param {Record<string, any>} obj - The object to search.
 * @param {string} keys - A string of property names separated by dots (e.g., "a.b.c").
 * @returns {any} - The value at the nested key, or undefined if not found.
 */
export const getNestedValueByKey = (
  obj: Record<string, any>,
  keys: string
): any => {
  return keys
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
};
