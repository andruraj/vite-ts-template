import { twMerge } from "tailwind-merge";

export const Caret: React.FC<
  {
    direction: "left" | "right" | "up" | "down";
    size?: number;
    className?: string;
  } & React.HTMLAttributes<HTMLButtonElement>
> = ({ direction, size = 1, className, ...props }) => (
  <button
    className={twMerge(
      "inline-flex items-center justify-center aspect-square relative overflow-hidden",
      className
    )}
    style={{
      width: `${size * 2}rem`,
    }}
    tabIndex={0}
    {...props}
  >
    <span
      className={twMerge(
        "inline-flex w-0 h-0 border-transparent absolute inset-0",
        direction === "up" ? "border-b border-b-black" : "",
        direction === "down" ? "border-t border-t-black" : "",
        direction === "left" ? "border-r border-r-black" : "",
        direction === "right" ? "border-l border-l-black" : ""
      )}
      style={{
        borderWidth: `${size}rem`,
        top: direction === "up" ? `-${size / 2}rem` : "unset",
        bottom: direction === "down" ? `-${size / 2}rem` : "unset",
        left: direction === "left" ? `-${size / 2}rem` : "unset",
        right: direction === "right" ? `-${size / 2}rem` : "unset",
      }}
      aria-label={`Arrow pointing ${direction}`}
    />
  </button>
);

export const CloseButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    shape?: "circle" | "square" | "plain";
  }
> = ({ size = "md", shape = "plain", ...props }) => (
  <button
    className={twMerge(
      "bg-red-500 text-white flex items-center justify-center aspect-square",
      size === "xs" ? "w-4 p-[4px]" : "",
      size === "sm" ? "w-5 p-[5px]" : "",
      size === "md" ? "w-7 p-[6px]" : "",
      size === "lg" ? "w-8 p-[7px]" : "",
      size === "xl" ? "w-12 p-[8px]" : "",
      shape === "circle" ? "rounded-full" : "",
      shape === "square" ? "rounded-none" : "",
      shape === "plain" ? "rounded" : ""
    )}
    {...props}
  >
    <Close strokeWidth={8} />
    {/* <Close strokeWidth={parseInt(twMerge(size === "xs" ? "8" : ""))} /> */}
  </button>
);

export const Close: React.FC<
  { strokeWidth?: number } & React.HTMLAttributes<SVGElement>
> = ({ strokeWidth = 5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <line
      x1="1"
      y1="31"
      x2="31"
      y2="1"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <line
      x1="1"
      y1="1"
      x2="31"
      y2="31"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const Arrows: React.FC<
  {
    direction: "left" | "right" | "up" | "down";
    className?: string;
  } & React.HTMLAttributes<HTMLSpanElement>
> = ({ direction, className, ...props }) => {
  const arrowMap = {
    left: <>&#11164;</>,
    right: <>&#11166;</>,
    up: <>&#11165;</>,
    down: <>&#11167;</>,
  };

  return (
    <span
      className={twMerge(
        "aspect-square leading-none tracking-normal select-none inline-flex items-center justify-center overflow-hidden align-middle",
        className
      )}
      {...props}
    >
      {arrowMap[direction]}
    </span>
  );
};

export const LoadingSpinner: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <span
    className={twMerge(
      "w-20 h-20 rounded-full border-4 border-neutral-200 border-t-sky-500 animate-spin",
      props.className
    )}
  ></span>
);
