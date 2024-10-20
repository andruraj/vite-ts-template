import { useCallback, useRef, useState } from "react";

/**
 * Checks if a value is a function.
 * @param value - The value to check.
 * @returns {value is Function} - True if the value is a function, otherwise false.
 */
const isFunction = (value: any): value is Function =>
  typeof value === "function";

/**
 * @typedef {object} HistoryObject
 * @property {Array<any>} history - The history of state values.
 * @property {number} pointer - The current pointer in the history.
 * @property {boolean} canUndo - If undo is available.
 * @property {Function} undo - Function to undo the last state change.
 * @property {boolean} canRedo - If redo is available.
 * @property {Function} redo - Function to redo the last undone state change.
 * @property {(number) => void} goto - Function to go to a specific history index.
 * @property {(any) => void} set - Function to set the value of state.
 */
interface HistoryObject<T> {
  history: T[];
  pointer: number;
  canUndo: boolean;
  undo: () => void;
  canRedo: boolean;
  redo: () => void;
  goto: (index: number) => void;
  set: (value: T | ((prev: T) => T)) => void;
}

/**
 * Custom hook to manage state with history and undo/redo functionality.
 * @param {T} defaultValue - The initial value of the state.
 * @param {Object} options - Options for the hook.
 * @param {number|null} [options.capacity=null] - The maximum number of history entries to keep. Pass null for unlimited capacity.
 * @param {Array<Function>} [options.middleware=[]] - Array of middleware functions.
 * @returns {[T, HistoryObject<T>]} - The current value, a setter function, and an object with history management functions.
 */
export const useStateWithHistory = <T>(
  defaultValue: T,
  {
    capacity = null,
    middleware = [],
  }: { capacity?: number | null; middleware?: Array<(value: T) => void> } = {}
): [T, HistoryObject<T>] => {
  const [value, setValue] = useState<T>(defaultValue);

  const historyRef = useRef<T[]>([value]);
  const pointerRef = useRef<number>(0);

  const executeMiddleware = useCallback(() => {
    middleware.forEach((mw) => {
      try {
        mw(historyRef.current[pointerRef.current]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Middleware Error: ${error.message}`);
        } else {
          console.error(`Middleware Error: ${String(error)}`);
        }
      }
    });
  }, [middleware]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      // Use the isFunction type guard to check if v is callable
      const resolvedValue = isFunction(v) ? v(value) : v;

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        historyRef.current = [
          ...historyRef.current.slice(0, pointerRef.current + 1),
          resolvedValue,
        ];

        if (capacity !== null && historyRef.current.length > capacity) {
          historyRef.current = historyRef.current.slice(
            historyRef.current.length - capacity
          );
        }

        pointerRef.current = historyRef.current.length - 1;
      }

      setValue(resolvedValue);
      executeMiddleware();
    },
    [capacity, executeMiddleware, value]
  );

  const undo = useCallback(() => {
    if (pointerRef.current <= 0) return;

    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
    executeMiddleware();
  }, [executeMiddleware]);

  const redo = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;

    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
    executeMiddleware();
  }, [executeMiddleware]);

  const goto = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= historyRef.current.length ||
        index === pointerRef.current
      )
        return;

      pointerRef.current = index;
      setValue(historyRef.current[pointerRef.current]);
      executeMiddleware();
    },
    [executeMiddleware]
  );

  const canUndo = pointerRef.current > 0;
  const canRedo = pointerRef.current < historyRef.current.length - 1;

  return [
    value,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      canUndo,
      undo,
      canRedo,
      redo,
      goto,
      set,
    },
  ];
};
