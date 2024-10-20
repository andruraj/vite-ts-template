// import { useEffect } from "react";
import { useEventListener } from "./useEventListener";

/**
 * Custom hook that detects clicks outside of a specified element.
 *
 * @param ref - A React RefObject pointing to the element to monitor.
 * @param callback - A function to call when a click outside the element is detected.
 * @param element - The DOM element or window/document to listen for clicks on. Defaults to `document`.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => {
 *   console.log("Clicked outside!");
 * });
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
  element: HTMLElement | Document | Window = document
) => {
  // useEffect(() => {
  //   if (typeof window === "undefined") return; // Check if running in a browser environment

  //   const handleClick = (e: Event) => {
  //     // Ensure that e is a MouseEvent
  //     const mouseEvent = e as MouseEvent;
  //     if (
  //       ref.current &&
  //       mouseEvent.target instanceof Node &&
  //       ref.current.contains(mouseEvent.target)
  //     ) {
  //       return; // Check if click is inside the ref
  //     }
  //     callback(mouseEvent); // Execute the callback if clicked outside
  //   };

  //   element.addEventListener("click", handleClick);

  //   return () => {
  //     element.removeEventListener("click", handleClick);
  //   };
  // }, [ref, callback, element]); // Include 'element' in the dependency array

  useEventListener(
    "click",
    (e: Event) => {
      // Ensure that e is a MouseEvent
      const mouseEvent = e as MouseEvent;
      if (
        ref.current &&
        mouseEvent.target instanceof Node &&
        ref.current.contains(mouseEvent.target)
      ) {
        return; // Check if click is inside the ref
      }
      callback(mouseEvent); // Execute the callback if clicked outside
    },
    element
  );
};
