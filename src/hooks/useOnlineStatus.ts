import { useState, useEffect } from "react";
import { useEventListener } from "./useEventListener";

/**
 * Custom hook that tracks the online status of the browser.
 * @returns {boolean} Boolean indicating whether the browser is online (true) or offline (false).
 *
 * @example
 * // Example usage:
 * const isOnline = useOnlineStatus();
 * // Use isOnline to conditionally render UI based on network connectivity.
 */
export const useOnlineStatus = (): boolean => {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  // Add event listeners for online and offline events
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    useEventListener("online", handleOnline);
    useEventListener("offline", handleOffline);

    // Optional: Clean up event listeners on component unmount
    return () => {
      // Assuming useEventListener handles cleanup,
      // otherwise, you can remove event listeners here if needed.
    };
  }, []);

  return online;
};
