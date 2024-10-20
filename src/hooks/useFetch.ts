import { useEffect, useState } from "react";
import { deepMerge } from "@utils/objectMerge";

const DEFAULT_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Custom hook to handle fetching data from an API endpoint using fetch() with options and dependencies.
 * Fetch operation is initiated immediately upon hook invocation.
 * @param url - The URL endpoint to fetch data from.
 * @param options - Additional options to customize the fetch request (e.g., headers, method).
 * @param dependencies - Dependencies array to watch for changes and trigger fetch request.
 * @returns Object containing loading state, error state, and fetched data.
 *
 * @example
 * const { isLoading, isError, error, data } = useFetch("https://api.example.com/data", { method: "GET" }, [userId]);
 */
export const useFetch = (
  url: string,
  options: RequestInit = {},
  dependencies: any[] = []
) => {
  const [fetchData, states] = useLazyFetch(url, options);

  useEffect(() => {
    fetchData();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return states;
};

/**
 * Custom hook to handle fetching data from an API endpoint using fetch() with options and dependencies.
 * Fetch operation is initiated on request via the fetchData function.
 *
 * @typedef FetchState
 * @property {boolean} isLoading - Indicates if the fetch operation is currently loading.
 * @property {boolean} isError - Indicates if an error occurred during the fetch operation.
 * @property {any} error - The error object if isError is true, otherwise undefined.
 * @property {any} data - The data retrieved from the fetch operation, undefined until data is fetched successfully.
 * @property {Function} fetchData - Function to manually trigger the fetch operation.
 *
 * @param url - The URL endpoint to fetch data from.
 * @param options - Additional options to customize the fetch request (e.g., headers, method).
 * @returns Array containing a function to manually trigger fetch and an object with loading state, error state, fetched data.
 *
 * @example
 * const [fetchData, { isLoading, isError, error, data }] = useLazyFetch("https://api.example.com/data", { method: "GET" });
 */
export const useLazyFetch = (
  url: string,
  options: RequestInit = {}
): [() => Promise<void>, FetchState] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setData(null);

    const mergedOptions = deepMerge(DEFAULT_OPTIONS, options);

    try {
      const res = await fetch(url, mergedOptions);

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to fetch data");
      }

      const contentType = res.headers.get("Content-Type");
      const result =
        contentType && contentType.includes("application/json")
          ? await res.json()
          : await res.text();

      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, { isLoading, isError, error, data }];
};

// Type definition for FetchState
export type FetchState = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
};
