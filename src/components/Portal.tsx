import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  defaultPortalRootId?: string;
  portalRoot?: HTMLElement | null;
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({
  defaultPortalRootId = "portal-root",
  portalRoot: externalPortalRoot,
  children,
}) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const appBody = document.getElementById("root");

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
        return () => {};
      }
    }
  }, [defaultPortalRootId, externalPortalRoot]);

  return portalRoot ? createPortal(children, portalRoot) : null;
};
