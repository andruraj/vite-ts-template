import { useState, useEffect } from "react";
import { useTimeout } from "./useTimeout";
import { useEventListener } from "./useEventListener";

/**
 * Custom hook that tracks user activity to determine if the user is idle.
 * @param timeout - Timeout duration in milliseconds to determine idle state.
 * @returns Boolean indicating whether the user is idle (true) or active (false).
 *
 * @example
 * // Example usage:
 * const isIdle = useIdle(30000); // Sets idle state after 30 seconds of inactivity
 */
export const useIdle = (timeout: number = 5 * 60 * 1000): boolean => {
  const [idle, setIdle] = useState<boolean>(false);
  const { reset, clear } = useTimeout(() => setIdle(true), timeout);

  useEffect(() => {
    const handleActivity = () => {
      setIdle(false);
      reset();
    };

    // Set up event listeners for mousemove and keydown
    useEventListener("mousemove", handleActivity);
    useEventListener("keydown", handleActivity);

    // Reset timeout initially and whenever timeout changes
    reset();

    return () => {
      clear(); // Clean up timeout when component unmounts
    };
  }, [timeout, reset, clear]);

  return idle;
};
