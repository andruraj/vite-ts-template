import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook to handle timeout operations in React components.
 * @param {() => void} callback - The callback function to execute when the timeout completes.
 * @param {number} delay - The delay in milliseconds before the callback is invoked.
 * @returns {{ reset: () => void; clear: () => void }} An object containing functions to reset and clear the timeout.
 *
 * @example
 * // Example usage:
 * const { reset, clear } = useTimeout(() => {
 *   console.log("Timeout completed!");
 * }, 1000);
 * // Use reset to restart the timeout and clear to cancel it.
 */
export const useTimeout = (callback: () => void, delay: number) => {
  const callbackRef = useRef<() => void>(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update callbackRef.current if callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set the timeout
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  // Clear the timeout
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Set timeout on mount and clear on unmount, update on delay change
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  // Reset timeout
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};
