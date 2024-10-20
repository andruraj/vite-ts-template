import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface UsePortalOptions {
  defaultPortalRootId?: string;
  portalRoot?: HTMLElement | null;
  children: React.ReactNode;
}

export const usePortal = ({
  defaultPortalRootId = "portal-root",
  portalRoot: externalPortalRoot,
  children,
}: UsePortalOptions) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const appBody = document.getElementById("touchbuilder");

    if (appBody) {
      const existingPortalRoot =
        externalPortalRoot || document.getElementById(defaultPortalRootId);

      if (!existingPortalRoot) {
        const newPortalRoot = document.createElement("div");
        newPortalRoot.id = defaultPortalRootId;

        appBody.appendChild(newPortalRoot);
        setPortalRoot(newPortalRoot);

        return () => {
          appBody.removeChild(newPortalRoot);
        };
      } else {
        setPortalRoot(existingPortalRoot);
      }
    }
  }, [defaultPortalRootId, externalPortalRoot]);

  if (portalRoot) {
    return createPortal(children, portalRoot);
  }

  return null;
};
