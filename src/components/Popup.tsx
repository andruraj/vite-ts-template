import { useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "./Portal";
import { useClickOutside } from "@hooks/useClickOutside";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  popupContent: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  trigger?: "click" | "hover";
  gap?: number;
  placement?:
    | "top"
    | "topLeft"
    | "topRight"
    | "left"
    | "leftTop"
    | "leftBottom"
    | "right"
    | "rightTop"
    | "rightBottom"
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | "center";
  zIndex?: number;
  triggerDuration?: number;
  maskClosable?: boolean;
}

/**
 * Popup component to display content based on trigger and position.
 *
 * @param {PopupProps} props - Popup component props.
 * @returns {JSX.Element} - Popup component UI.
 */
export const Popup: React.FC<PopupProps> = ({
  popupContent,
  children,
  isOpen: defaultOpen,
  trigger = "click",
  gap = 0,
  placement = "center",
  zIndex = 10,
  triggerDuration = 0,
  maskClosable = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: -500, left: -500 });
  const popupWrapperRef = useRef(null);
  const popupContentRef = useRef(null);

  useClickOutside(popupContentRef, () => {
    if (trigger === "click" && maskClosable) {
      setIsOpen(false);
    }
  });

  const calculatePosition = useCallback(() => {
    if (popupWrapperRef.current && popupContentRef.current) {
      const browserWindowHeight = window.innerHeight;
      const browserWindowWidth = window.innerWidth;

      const wrapperRect = (
        popupWrapperRef.current as HTMLElement
      ).getBoundingClientRect();
      const popupRect = (
        popupContentRef.current as HTMLElement
      ).getBoundingClientRect();

      let pos = JSON.parse(JSON.stringify(position));

      switch (placement) {
        case "top": {
          pos.top =
            wrapperRect.top - popupRect.height - gap < 0
              ? wrapperRect.bottom + gap
              : wrapperRect.top - popupRect.height - gap;
          pos.left =
            wrapperRect.left + wrapperRect.width / 2 - popupRect.width / 2;
          break;
        }
        case "topLeft": {
          pos.top =
            wrapperRect.top - popupRect.height - gap < 0
              ? wrapperRect.bottom + gap
              : wrapperRect.top - popupRect.height - gap;
          pos.left = wrapperRect.left;
          break;
        }
        case "topRight": {
          pos.top =
            wrapperRect.top - popupRect.height - gap < 0
              ? wrapperRect.bottom + gap
              : wrapperRect.top - popupRect.height - gap;
          pos.left = wrapperRect.right - popupRect.width;
          break;
        }
        case "left": {
          pos.top =
            wrapperRect.top + wrapperRect.height / 2 - popupRect.height / 2;
          pos.left =
            wrapperRect.left - popupRect.width - gap < 0
              ? wrapperRect.right + gap
              : wrapperRect.left - popupRect.width - gap;
          break;
        }
        case "leftTop": {
          pos.top = wrapperRect.top;
          pos.left =
            wrapperRect.left - popupRect.width - gap < 0
              ? wrapperRect.right + gap
              : wrapperRect.left - popupRect.width - gap;
          break;
        }
        case "leftBottom": {
          pos.top = wrapperRect.bottom - popupRect.height;
          pos.left =
            wrapperRect.left - popupRect.width - gap < 0
              ? wrapperRect.right + gap
              : wrapperRect.left - popupRect.width - gap;
          break;
        }
        case "right": {
          pos.top =
            wrapperRect.top + wrapperRect.height / 2 - popupRect.height / 2;
          pos.left =
            wrapperRect.right + popupRect.width + gap > browserWindowWidth
              ? wrapperRect.left - popupRect.width - gap
              : wrapperRect.right + gap;
          break;
        }
        case "rightTop": {
          pos.top = wrapperRect.top;
          pos.left =
            wrapperRect.right + popupRect.width + gap > browserWindowWidth
              ? wrapperRect.left - popupRect.width - gap
              : wrapperRect.right + gap;
          break;
        }
        case "rightBottom": {
          pos.top = wrapperRect.bottom - popupRect.height;
          pos.left =
            wrapperRect.right + popupRect.width + gap > browserWindowWidth
              ? wrapperRect.left - popupRect.width - gap
              : wrapperRect.right + gap;
          break;
        }
        case "bottom": {
          pos.top =
            wrapperRect.bottom + popupRect.height + gap > browserWindowHeight
              ? wrapperRect.top - popupRect.height - gap
              : wrapperRect.bottom + gap;
          pos.left =
            wrapperRect.left + wrapperRect.width / 2 - popupRect.width / 2;
          break;
        }
        case "bottomLeft": {
          pos.top =
            wrapperRect.bottom + popupRect.height + gap > browserWindowHeight
              ? wrapperRect.top - popupRect.height - gap
              : wrapperRect.bottom + gap;
          pos.left = wrapperRect.left;
          break;
        }
        case "bottomRight": {
          pos.top =
            wrapperRect.bottom + popupRect.height + gap > browserWindowHeight
              ? wrapperRect.top - popupRect.height - gap
              : wrapperRect.bottom + gap;
          pos.left = wrapperRect.right - popupRect.width;
          break;
        }
        case "center":
        default:
          {
            pos.top =
              wrapperRect.top + wrapperRect.height / 2 - popupRect.height / 2;
            pos.left =
              wrapperRect.left + wrapperRect.width / 2 - popupRect.width / 2;
          }
          break;
      }

      if (JSON.stringify(pos) !== JSON.stringify(position)) {
        setPosition(pos);
      }
    }
  }, [gap, placement]);

  useEffect(() => {
    if (popupWrapperRef.current && popupContentRef.current) {
      calculatePosition();
    }

    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, [calculatePosition, popupWrapperRef.current, popupContentRef.current]);

  useEffect(() => {
    setIsOpen(!!defaultOpen);
  }, [defaultOpen]);

  return (
    <div
      id="popup-wrapper"
      className="cursor-pointer inline-block"
      onClick={
        trigger === "click"
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();

              setIsOpen((p) => !p);
            }
          : undefined
      }
      onMouseEnter={
        trigger === "hover"
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();

              setIsOpen(true);
            }
          : undefined
      }
      onMouseLeave={
        trigger === "hover"
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();

              setIsOpen(false);
            }
          : undefined
      }
      ref={popupWrapperRef}
    >
      {children}

      <Portal>
        <div
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: zIndex,
            visibility: isOpen ? "visible" : "hidden",
            opacity: isOpen ? 1 : 0,
            transition: `all ${triggerDuration}s`,
          }}
          ref={popupContentRef}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
        >
          {popupContent}
        </div>
      </Portal>
    </div>
  );
};
