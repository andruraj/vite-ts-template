import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "accent" | "link";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  size = "md",
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "cursor-pointer select-none [outline:none] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-inner";

  const sizeStyles = {
    xs: "text-xs px-4 py-0.5",
    sm: "text-sm px-5 py-0.5",
    md: "text-base px-6 py-1",
    lg: "text-lg px-8 py-1.5",
    xl: "text-xl px-10 py-2",
  };

  const variantStyles = {
    link: "text-blue-400 underline font-medium p-0",
    primary:
      "focus-within:[box-shadow:inset_0_1px_1px_rgba(0,0,0,.075),0_0_8px_rgba(82,168,236,.6)] shadow-md text-text bg-primary font-semibold",
    secondary:
      "focus-within:[box-shadow:inset_0_1px_1px_rgba(0,0,0,.075),0_0_8px_rgba(82,168,236,.6)] shadow-md text-text bg-secondary font-semibold",
    accent:
      "focus-within:[box-shadow:inset_0_1px_1px_rgba(0,0,0,.075),0_0_8px_rgba(82,168,236,.6)] shadow-md text-text bg-accent font-semibold",
  };

  return (
    <button
      type={props.type ?? "button"}
      className={twMerge(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
