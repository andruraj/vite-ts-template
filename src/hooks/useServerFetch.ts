import { useEffect, useState } from "react";

// Define the FetchState type
interface FetchState<T = any> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: any;
  data: T | null;
  reset: () => void;
}

/**
 * Custom hook to handle fetching data from an API endpoint using fetch() with options and dependencies.
 * Fetch operation is initiated immediately upon hook invocation.
 * @param url - The URL endpoint to fetch data from.
 * @param options - Additional options to customize the fetch request (e.g., headers, method).
 * @param dependencies - Dependencies array to watch for changes and trigger fetch request.
 * @returns Object containing loading state, error state, and fetched data.
 */
export const useServerFetch = <T>(
  url: string | URL | Request,
  options: RequestInit = {},
  dependencies: any[] = []
): FetchState<T> => {
  const [fetchData, states] = useLazyServerFetch<T>(url); // Ensure correct type here

  useEffect(() => {
    fetchData({}, options); // Call fetchData with an empty object for queryParams
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return states;
};

/**
 * Custom hook to handle fetching data from an API endpoint using fetch() with options.
 * Fetch operation is initiated on request via the fetchData function.
 * @param url - The URL endpoint to fetch data from.
 * @returns Array containing a function to manually trigger fetch and an object with loading state, error state, success state, fetched data, and a reset function.
 */
export const useLazyServerFetch = <T>(
  url: string | URL | Request
): [
  fetchData: (
    queryParams?:
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams,
    options?: RequestInit
  ) => Promise<void>,
  FetchState<T>
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const reset = () => {
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    setData(null);
  };

  /**
   * @param queryParams - Query parameters to be included in the URL.
   * @param options - Additional options to customize the fetch request (e.g., headers, method).
   * @returns void
   */
  const fetchData = async (
    queryParams:
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams = {},
    options: RequestInit = {}
  ): Promise<void> => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    setData(null);

    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;

      const res = await fetch(fullUrl, options);

      // Check if the response is ok (status in the range 200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Assuming the response is JSON, parse it
      const result: T = await res.json(); // Type assertion can be used here

      setData(result); // Now this will match type T
    } catch (error) {
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return [fetchData, { isLoading, isError, isSuccess, error, data, reset }];
};
