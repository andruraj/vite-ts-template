import { isEmpty } from "./isEmpty";

/**
 * Removes properties with empty values from an object.
 *
 * @param {Record<string, any>} obj - The object to be cleaned.
 * @returns {Record<string, any>} - A new object with all empty properties removed.
 */
export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  const newObj = JSON.parse(JSON.stringify(obj)); // Deep clone the object

  for (const propName in newObj) {
    if (isEmpty(newObj[propName])) {
      delete newObj[propName]; // Remove property if empty
    }
  }

  return newObj;
};
