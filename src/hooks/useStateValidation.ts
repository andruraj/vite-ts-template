import { useCallback, useState } from "react";

/**
 * Custom hook to manage state with validation and track validity.
 * @param {Function} validationFunc - Function to validate the state value.
 * @param {T} initialValue - Initial value for the state.
 * @returns {[T, (nextState: T | ((prevState: T) => T)) => void, boolean]} Tuple containing state value, function to update state with validation, and boolean indicating validity.
 *
 * @example
 * // Example usage:
 * const isNotEmpty = (value: string) => value.trim() !== "";
 * const [name, setName, isNameValid] = useStateWithValidation(isNotEmpty, "");
 * // Renders based on name state and isNameValid indicating validity.
 */
export const useStateWithValidation = <T>(
  validationFunc: (value: T) => boolean,
  initialValue: T
): [T, (nextState: T | ((prevState: T) => T)) => void, boolean] => {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(() =>
    validationFunc(initialValue)
  );

  /**
   * Function to update state value and validate it.
   * @param {T | ((prevState: T) => T)} nextState - Next state value or function to compute next state based on current state.
   */
  const onChange = useCallback(
    (nextState: T | ((prevState: T) => T)) => {
      const value =
        typeof nextState === "function"
          ? (nextState as (prevState: T) => T)(state)
          : nextState;

      setState(value);
      setIsValid(validationFunc(value));
    },
    [state, validationFunc]
  );

  return [state, onChange, isValid];
};
