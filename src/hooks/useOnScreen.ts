import { useEffect, useState, MutableRefObject } from "react";

/**
 * Custom hook to monitor if a specified element is within the viewport using IntersectionObserver.
 * @param {MutableRefObject<HTMLElement | null>} ref - Reference to the element to observe.
 * @param {number} [rootMargin=0] - Margin around the root (viewport) to adjust the visibility check.
 * @returns {boolean} isVisible - Boolean indicating if the observed element is currently visible in the viewport.
 *
 * @example
 * // Example usage:
 * const ref = useRef<HTMLDivElement>(null);
 * const isVisible = useOnScreen(ref, 100);
 * // Renders based on isVisible state indicating if the element is in viewport.
 */
export const useOnScreen = (
  ref: MutableRefObject<HTMLElement | null>,
  rootMargin = 0
): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: `${rootMargin}px` }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isVisible;
};
