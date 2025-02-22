import { useEffect } from "react";

/**
 * Custom hook that executes an async callback function and cleans up on component unmount or when dependencies change.
 * @param {() => Promise<void>} asyncCallback - The async function to be executed.
 * @param {Array<any>} [dependencies] - Optional dependencies to watch for changes and trigger the async function.
 *
 * @example
 * // Example usage:
 * useAsyncEffect(async () => {
 *   const data = await fetchData();
 *   setData(data);
 * }, [userId]);
 * // Fetches data when userId changes and cleans up on component unmount.
 */
export const useAsyncEffect = (
  asyncCallback: () => Promise<void>,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const executeAsyncCallback = async () => {
      await asyncCallback();
    };

    executeAsyncCallback();

    return () => {
      // Cleanup function (optional)
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};
