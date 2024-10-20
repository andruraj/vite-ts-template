import { useState } from "react";

/**
 * Custom hook to manage an array state with various helper functions.
 * @param {T[]} defaultValue - The initial value of the array.
 * @returns {ReturnObject<T>} - An object containing the array, functions to manipulate the array, and the array length.
 *
 * @typedef {object} ReturnObject<T>
 * @property {T[]} array - The current array state.
 * @property {(array: T[]) => void} set - The function to set the array state.
 * @property {(element: T) => void} pushBottom - Function to add an element to the bottom of the array.
 * @property {(element: T) => void} pushTop - Function to add an element to the top of the array.
 * @property {() => void} removeBottom - Function to remove the last element from the array.
 * @property {() => void} removeTop - Function to remove the first element from the array.
 * @property {(callback: (element: T) => boolean) => void} filter - Function to filter the array based on a callback.
 * @property {(index: number, newElement: T) => void} update - Function to update an element at a specific index.
 * @property {(index: number) => void} remove - Function to remove an element at a specific index.
 * @property {() => void} clear - Function to clear the array.
 * @property {() => number} size - The length of the array.
 * @property {T | undefined} first - First element of the array.
 * @property {T | undefined} last - Last element of the array.
 */
export const useArray = <T>(defaultValue: T[]) => {
  const [array, setArray] = useState<T[]>(defaultValue);

  const pushBottom = (element: T) => setArray((a) => [...a, element]);

  const pushTop = (element: T) => setArray((a) => [element, ...a]);

  const removeBottom = () => setArray((a) => a.slice(0, -1)); // Removes last element

  const removeTop = () => setArray((a) => a.slice(1)); // Removes first element

  const size = () => array.length;

  const first = () => array[0];

  const last = () => array[array.length - 1];

  const filter = (callback: (element: T) => boolean) =>
    setArray((a) => a.filter(callback));

  const update = (index: number, newElement: T) =>
    setArray((a) => [...a.slice(0, index), newElement, ...a.slice(index + 1)]);

  const remove = (index: number) =>
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1)]);

  const clear = () => setArray([]);

  return {
    array,
    set: setArray,
    pushTop,
    pushBottom,
    filter,
    update,
    remove,
    removeTop,
    removeBottom,
    clear,
    first,
    last,
    size,
  };
};
