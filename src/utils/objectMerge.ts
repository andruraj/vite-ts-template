/**
 * Shallowly merges two or more objects.
 * @param {T} target - The target object to merge properties into.
 * @param {...Partial<T>} sources - The source objects to merge into the target.
 * @returns {T} A new object that is the result of merging the sources into the target.
 */
export function shallowMerge<T>(target: T, ...sources: Partial<T>[]): T {
  const result: T = { ...target }; // Create a shallow copy of the target

  for (const source of sources) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        result[key] = source[key] as any; // Directly assign the source value
      }
    }
  }

  return result;
}

/**
 * Deeply merges two or more objects.
 * @param target - The target object to merge properties into.
 * @param sources - The source objects to merge into the target.
 * @returns A new object that is the result of merging the sources into the target.
 */
export function deepMerge<T extends object>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result: T = { ...target }; // Create a shallow copy of the target

  for (const source of sources) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const targetValue = result[key];
        const sourceValue = source[key];

        // Check if both values are objects and not null
        if (isObject(targetValue) && isObject(sourceValue)) {
          // Recursively merge
          result[key] = deepMerge(
            targetValue,
            sourceValue as Partial<
              T[Extract<keyof T, string>] & Record<string, any>
            >
          );
        } else {
          result[key] = sourceValue as T[Extract<keyof T, string>]; // Assign the source value directly
        }
      }
    }
  }

  return result;
}

/**
 * Utility function to check if a value is an object.
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === "object";
}
