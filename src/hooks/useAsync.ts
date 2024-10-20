import { useEffect, useState } from "react";

/**
 * Custom hook to handle asynchronous operations with loading state, error state, and data retrieval.
 * @param {(...args: any[]) => Promise<T>} asyncFunction - The asynchronous function to execute.
 * @param {Array<any>} [dependencies=[]] - Dependencies array to watch for changes and trigger async function.
 * @returns {AsyncState<T>} Object containing loading state, error state, and fetched data.
 *
 * @typedef {Object} AsyncState<T>
 * @property {boolean} isLoading - Indicates if the async operation is currently loading.
 * @property {boolean} isError - Indicates if an error occurred during the async operation.
 * @property {Error | null} error - The error object if isError is true, otherwise null.
 * @property {T | null} data - The data retrieved from the async operation, null until data is fetched successfully.
 *
 * @example
 * const { isLoading, isError, error, data } = useAsync(() => fetchData(userId), [userId]);
 */
export const useAsync = <T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  dependencies: any[] = []
) => {
  const [fetch, states] = useLazyAsync(asyncFunction);

  useEffect(() => {
    fetch();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return states;
};

/**
 * Custom hook to handle lazy asynchronous operations with loading state, error state, and data retrieval.
 * @param {(...args: any[]) => Promise<T>} asyncFunction - The asynchronous function to execute.
 * @returns {[TriggerFunction, AsyncState<T>]} An array containing a function to trigger the async operation and an object with loading state, error state, and fetched data.
 *
 * @typedef {Object} AsyncState<T>
 * @property {boolean} isLoading - Indicates if the async operation is currently loading.
 * @property {boolean} isError - Indicates if an error occurred during the async operation.
 * @property {Error | null} error - The error object if isError is true, otherwise null.
 * @property {T | null} data - The data retrieved from the async operation, null until data is fetched successfully.
 *
 * @typedef {Function} TriggerFunction
 * @param {Array<any>} [dependencies=[]] - Dependencies array to watch for changes and trigger async function.
 *
 * @example
 * const [fetchData, { isLoading, isError, error, data }] = useLazyAsync(() => fetchData(userId));
 * fetchData([userId]);
 */
export const useLazyAsync = <T>(
  asyncFunction: (...args: any[]) => Promise<T>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async (dependencies: any[] = []) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setData(null);

    try {
      const result = await asyncFunction(...dependencies); // Now spread works correctly
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [
    fetchData,
    {
      isLoading,
      isError,
      error,
      data,
    },
  ] as const; // This ensures the return type is inferred correctly
};
