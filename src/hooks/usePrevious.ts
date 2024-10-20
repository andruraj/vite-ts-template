import { useRef } from "react";

/**
 * Custom hook to get the previous value of a state or prop.
 * @param T - The type of the value.
 * @param {T} value - The current value.
 * @returns {T | undefined} - The previous value, or undefined if it doesn't exist.
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const currentRef = useRef(value);
  const previousRef = useRef<T | undefined>(undefined);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
};
