/**
 * Shallow comparison of two objects.
 * @param {T} objA - First object.
 * @param {T} objB - Second object.
 * @returns {boolean} True if objects are shallowly equal, false otherwise.
 * @example
 * isShallowEqual({a: 1, b: 2}, {a: 1, b: 2}); // true
 * isShallowEqual({a: 1, b: 2}, {a: 1, b: 3}); // false
 * isShallowEqual({a: 1}, {a: 1, b: 2}); // false
 * isShallowEqual(null, {a: 1}); // false
 * isShallowEqual({a: 1}, undefined); // false
 */
export const isShallowEqual = <T extends object>(
  objA: T | null | undefined,
  objB: T | null | undefined
): boolean => {
  if (objA === objB) return true;

  if (
    objA == null ||
    objB == null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  const keysA = Object.keys(objA) as Array<keyof T>; // Cast keys to the appropriate type
  const keysB = Object.keys(objB) as Array<keyof T>;

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (objA[key] !== objB[key]) return false; // Accessing properties safely
  }

  return true;
};

/**
 * Compares 2 items deeply and returns true if equal and false if unequal.
 * Supports primitive types, arrays, objects, sets, maps, and symbols.
 * @param {any} a - Item to compare.
 * @param {any} b - Item to be compared with.
 * @param {number} [depth=0] - Current recursion depth.
 * @param {number} [maxDepth=100] - Maximum recursion depth to prevent stack overflow.
 * @param {WeakMap<any, any>} [memo=new WeakMap()] - Memoization cache for storing comparison results.
 * @param {WeakSet<any>} [seen=new WeakSet()] - Set to track visited objects and avoid circular references.
 * @returns {boolean} True if items are deeply equal, false otherwise.
 */
export const isDeepEqual = (
  a: any,
  b: any,
  depth: number = 0,
  maxDepth: number = 100,
  memo: WeakMap<any, any> = new WeakMap(),
  seen: WeakSet<any> = new WeakSet()
): boolean => {
  // Handle primitive types and reference equality
  if (a === b) return true;

  // Handle null and undefined
  if (a == null || b == null) return a === b;

  // Ensure a and b are of the same type
  if (typeof a !== typeof b) return false;

  // Early exit if depth exceeds maximum recursion depth
  if (depth > maxDepth) {
    console.warn("Maximum recursion depth exceeded. Returning false.");
    return false;
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i], depth + 1, maxDepth, memo, seen))
        return false;
    }
    return true;
  }

  // Handle objects
  if (typeof a === "object" && typeof b === "object") {
    // Avoid circular references
    if (seen.has(a) || seen.has(b)) return false;
    seen.add(a);
    seen.add(b);

    // Handle Set
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (let item of a) {
        if (!b.has(item)) return false;
      }
      return true;
    }

    // Handle Map
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (let [key, value] of a) {
        if (
          !b.has(key) ||
          !isDeepEqual(value, b.get(key), depth + 1, maxDepth, memo, seen)
        ) {
          return false;
        }
      }
      return true;
    }

    // Handle plain objects
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (let key of keysA) {
      if (
        !keysB.includes(key) ||
        !isDeepEqual(a[key], b[key], depth + 1, maxDepth, memo, seen)
      ) {
        return false;
      }
    }
    return true;
  }

  // Handle Symbol
  if (typeof a === "symbol" && typeof b === "symbol") {
    return a.toString() === b.toString();
  }

  // For all other types (including functions), return false as a fallback
  return false;
};
