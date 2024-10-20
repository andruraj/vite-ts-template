import { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Hook to confirm exit when navigation occurs.
 * @param {() => boolean} confirmExit - Function to confirm exit.
 * @param {boolean} [when=true] - Condition to enable/disable the prompt.
 */
function useConfirmExit(confirmExit: () => boolean, when: boolean = true) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (when) {
        event.preventDefault();
        event.returnValue = ""; // Chrome requires this
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [when]);

  useEffect(() => {
    if (!when) return;

    const handlePopState = (event: PopStateEvent) => {
      const result = confirmExit();
      if (result === false) {
        event.preventDefault();
        navigate(location.pathname); // Cancel navigation
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, confirmExit, when, location.pathname]);
}

/**
 * Hook to prompt the user with a message when they try to exit the page.
 * @param {string} message - The message to display in the prompt.
 * @param {boolean} [when=true] - Condition to enable/disable the prompt.
 */
export function usePrompt(message: string, when: boolean = true) {
  const confirmExit = useCallback(() => {
    return window.confirm(message);
  }, [message]);

  useConfirmExit(confirmExit, when);
}
