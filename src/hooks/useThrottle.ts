import { useCallback, useEffect, useRef } from "react";
import { useTimeout } from "./useTimeout";

/**
 * Custom hook that throttles the execution of a callback function.
 * @param {() => void} callback - The function to be throttled.
 * @param {number} delay - The throttle delay in milliseconds.
 * @returns {() => void} Throttled function that can be called without throttling until the delay has passed.
 *
 * @example
 * // Example usage:
 * const throttledFunction = useThrottle(() => { console.log("Throttled function called"); }, 1000);
 * // Call throttledFunction to execute the callback, throttled to once per 1000ms.
 */
export const useThrottle = (
  callback: () => void,
  delay: number
): (() => void) => {
  const { reset } = useTimeout(callback, delay);
  const throttledCallback = useRef(reset);

  useEffect(() => {
    throttledCallback.current = reset;
  }, [reset]);

  const throttle = useCallback(() => {
    if (!throttledCallback.current) return;
    throttledCallback.current();
  }, []);

  return throttle;
};
