/**
 * Compares two arrays to check if they are equivalent (contain the same elements in any order).
 *
 * @param {any[]} arr1 - The first array to compare.
 * @param {any[]} arr2 - The second array to compare.
 * @returns {boolean} - Returns true if the arrays are equivalent, otherwise false.
 */
export const areArraysEquivalent = (arr1: any[], arr2: any[]): boolean => {
  // Step 1: Check if the lengths of the arrays are equal
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Step 2: Sort both arrays
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Step 3: Iterate through each element of the sorted arrays and compare them
  for (let i = 0; i < sortedArr1.length; i++) {
    // Step 4: Compare corresponding elements
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  // All elements are equal, so the arrays are equal
  return true;
};
