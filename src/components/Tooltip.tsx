import { twMerge } from "tailwind-merge";
import { Popup } from "./Popup";

interface TooltipProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  tooltipContent: string;
  children: React.ReactNode;
  placement: "top" | "bottom" | "left" | "right";
  gap?: number;
  type?: "primary" | "secondary" | "warning" | "error" | "default" | "accent";
  width?: number | string;
}

/**
 * The Tooltip component displays a tooltip when hovered over, with specified content and position.
 *
 * @param {TooltipProps} props - The properties for the Tooltip component.
 * @returns {React.ReactNode}
 */
export const Tooltip: React.FC<TooltipProps> = ({
  tooltipContent,
  children,
  placement,
  gap = 0,
  type = "default",
  width,
  style,
  ...props
}) => (
  <span className="relative cursor-pointer group">
    {children}
    <span
      className={twMerge(
        "text-white p-1 rounded text-xs absolute hidden group-hover:flex w-max",
        placement === "top" ? "bottom-full left-1/2 -translate-x-1/2" : "",
        placement === "bottom" ? "top-full left-1/2 -translate-x-1/2" : "",
        placement === "left" ? "right-full top-1/2 -translate-y-1/2" : "",
        placement === "right" ? "left-full top-1/2 -translate-y-1/2" : "",
        type === "default" ? "bg-black" : "",
        type === "warning" ? "bg-warning" : "",
        type === "error" ? "bg-red-500" : "",
        type === "accent" ? "bg-accent" : ""
      )}
      style={{
        marginBottom: placement === "top" ? gap : "unset",
        marginTop: placement === "bottom" ? gap : "unset",
        marginLeft: placement === "right" ? gap : "unset",
        marginRight: placement === "left" ? gap : "unset",
        maxWidth: width,
        ...style,
      }}
      {...props}
    >
      {tooltipContent}
    </span>
  </span>
);

interface TooltipGlobalProps extends React.HTMLAttributes<HTMLDivElement> {
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  placement:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";
  gap?: number;
  width?: number | string;
  zIndex?: number;
}

/**
 * The TooltipGlobal component renders a global tooltip that appears on hover or click, with specified content and placement.
 *
 * @param {TooltipGlobalProps} props - The properties for the TooltipGlobal component.
 * @returns {React.ReactNode}
 */
export const TooltipGlobal: React.FC<TooltipGlobalProps> = ({
  tooltipContent,
  children,
  style,
  placement,
  gap = 0,
  width,
  zIndex = 10,
  ...props
}) => (
  <Popup
    popupContent={tooltipContent}
    placement={placement}
    style={{ width, ...style }}
    gap={gap}
    trigger="hover"
    zIndex={zIndex}
    {...props}
  >
    {children}
  </Popup>
);
