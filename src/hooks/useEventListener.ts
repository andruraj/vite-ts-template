import { useEffect, useRef } from "react";

/**
 * Custom hook to attach an event listener to a DOM element.
 * @param eventType - The type of event to listen for (e.g., 'click', 'keydown').
 * @param callback - The callback function to execute when the event is triggered.
 * @param element - The DOM element to attach the event listener to (default is window).
 */
export const useEventListener = <T extends Event>(
  eventType: string,
  callback: (event: T) => void,
  element: HTMLElement | Window | Document = window
) => {
  const callbackRef = useRef<(event: T) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!(element && element.addEventListener)) return; // Ensure element is defined

    const eventListener = (event: T) => callbackRef.current(event as T);

    element.addEventListener(eventType, eventListener as EventListener);

    return () => {
      element.removeEventListener(eventType, eventListener as EventListener);
    };
  }, [eventType, element]);
};
