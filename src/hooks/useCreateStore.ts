import { useState, useEffect } from "react";
import { isShallowEqual } from "@utils/objectComparison";

/**
 * Creates a new store with an initial state and actions to update the state.
 * @param {() => T} initialState - A function returning the initial state of the store.
 * @returns {() => [T, (partial: Partial<T>) => void]} A custom hook to use the store.
 */
export const useCreateStore = <T>(initialState: () => T) => {
  let state = initialState();
  let listeners = new Map<Function, Function>();

  const setState = (partial: Partial<T>) => {
    let updatedState: Partial<T> = {};

    Object.keys(partial).forEach((key) => {
      const val = partial[key as keyof T];
      updatedState[key as keyof T] =
        typeof val === "function"
          ? (val as (prev: T[keyof T]) => T[keyof T])(state[key as keyof T])
          : val;
    });

    const newState = { ...state, ...updatedState };
    if (isShallowEqual(state, newState)) return; // Prevent unnecessary updates
    state = newState;
    listeners.forEach((listener) => listener(state));
  };

  const useStore = (): [T, (partial: Partial<T>) => void] => {
    const [, setRender] = useState(state);

    useEffect(() => {
      const listener = (newState: T) => setRender(newState);
      listeners.set(listener, listener);
      return () => {
        listeners.delete(listener);
      };
    }, []);

    return [state, setState];
  };

  return useStore;
};
