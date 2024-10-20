import { useEffect } from "react";
import { useEffectOnce } from "./useEffectOnce";
import { useEventListener } from "./useEventListener";
import { useTimeout } from "./useTimeout";

/**
 * Custom hook to detect long press (press and hold) gesture on a DOM element.
 * @param ref - Reference to the DOM element on which to detect long press.
 * @param callback - Callback function to execute when a long press is detected.
 * @param delay - Delay in milliseconds to determine the threshold for a long press.
 *
 * @example
 * // Example usage:
 * const buttonRef = useRef<HTMLButtonElement | null>(null);
 * const handleLongPress = () => {
 *   console.log("Long press detected!");
 *   // Perform actions for long press
 * };
 * useLongPress(buttonRef, handleLongPress, 500);
 */
export const useLongPress = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  delay = 250
): void => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffectOnce(clear);

  // Check if ref.current is not null before adding event listeners
  useEffect(() => {
    const element = ref.current;

    if (element) {
      useEventListener("mousedown", reset, element);
      useEventListener("touchstart", reset, element);
      useEventListener("mouseup", clear, element);
      useEventListener("mouseleave", clear, element);
      useEventListener("touchend", clear, element);
    }

    return () => {
      // Cleanup: Clear the timeout if the component unmounts
      clear();
    };
  }, [reset, clear, ref]);
};
