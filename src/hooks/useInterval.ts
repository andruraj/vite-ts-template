import { useEffect } from "react";

/**
 * Custom hook that executes a callback function at a specified interval.
 * @param callback - The function to be executed at each interval.
 * @param delay - The interval duration in milliseconds.
 *
 * @example
 * // Example usage:
 * useInterval(() => { console.log("Interval executed"); }, 1000);
 * // Executes the callback function every 1000ms.
 */
export const useInterval = (callback: () => void, delay: number): void => {
  useEffect(() => {
    if (delay === null) return; // Check if delay is not null or undefined

    const intervalId = setInterval(callback, delay);

    return () => clearInterval(intervalId);
  }, [callback, delay]);
};
