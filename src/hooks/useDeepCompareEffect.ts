import { useEffect, useRef } from "react";
import { isDeepEqual } from "@utils/objectComparison"; // Import your isEqual function

/**
 * Custom hook that triggers an effect callback when any of the dependencies change deeply.
 * @param callback - The callback function to execute when dependencies change.
 * @param dependencies - The dependencies to watch for changes (compared deeply).
 *
 * @example
 * // Example usage:
 * useDeepCompareEffect(() => {
 *   // Effect logic to execute when dependencies change
 *   console.log('Dependencies have changed:', dependencies);
 * }, [obj1, obj2]);
 */
export const useDeepCompareEffect = (
  callback: () => void,
  dependencies: any[]
) => {
  const currentDependenciesRef = useRef<any[]>(dependencies);

  if (!isDeepEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
};
