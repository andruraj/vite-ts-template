import { useEffect } from "react";

/**
 * Custom hook that triggers a callback function once when the component mounts.
 * @param callback - The callback function to execute once.
 *
 * @example
 * // Example usage:
 * useEffectOnce(() => {
 *   console.log('Component mounted');
 *   // Additional initialization logic
 * });
 */
export const useEffectOnce = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // Execute the callback once on mount
};
