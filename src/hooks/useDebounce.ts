import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

/**
 * Custom hook that debounces a callback function based on a specified delay.
 * @param callback - The callback function to debounce.
 * @param delay - The delay in milliseconds after which the callback should be invoked.
 * @param dependencies - The dependencies to watch for changes and trigger debouncing.
 *
 * @example
 * // Example usage:
 * const handleSearch = (query: string) => {
 *   // Perform search logic
 * };
 * const debouncedSearch = useDebounce(handleSearch, 500, [query]);
 * // debouncedSearch is now a debounced version of handleSearch function.
 */
export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
  dependencies: any[]
) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
    return clear;
  }, [...dependencies, reset, clear]);

  useEffect(() => clear, []); // Cleanup the timeout on unmount

  return { reset, clear };
};
