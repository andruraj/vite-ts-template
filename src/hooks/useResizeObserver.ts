import { useEffect, useRef, useCallback } from "react";

interface ResizeEvent {
  width: number;
  height: number;
}

/**
 * Custom hook to observe and handle resize events on a DOM element.
 * It uses the ResizeObserver API to listen for changes in the size of the element and triggers the
 * callback with the new dimensions.
 *
 * @param {(size: ResizeEvent) => void} onResize - Callback to handle the resize event. Receives an object containing `width` and `height`.
 * @returns {React.RefObject<HTMLDivElement>} A ref object to be attached to the DOM element to observe its size.
 *
 * @example
 * const App = () => {
 *   const handleResize = ({ width, height }) => {
 *     console.log("Resized:", width, height);
 *   };
 *   const ref = useResizeObserver(handleResize);
 *   return <div ref={ref}>Resize Me!</div>;
 * };
 */
export const useResizeObserver = (onResize: (size: ResizeEvent) => void) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Function to start observing the container element for resize changes.
   * @returns {() => void} Cleanup function to stop observing the element when unmounted.
   */
  const observeResize = useCallback(() => {
    const container = containerRef.current;

    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        onResize({ width, height });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
    };
  }, [onResize]);

  // Set up resize observer when component mounts, and clean up when it unmounts.
  useEffect(() => {
    const cleanup = observeResize();
    return () => {
      cleanup && cleanup();
    };
  }, [observeResize]);

  return containerRef;
};
