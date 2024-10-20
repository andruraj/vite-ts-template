import { uuid } from "@utils/uuid";
import { twMerge } from "tailwind-merge";

interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  label: string | React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  ...props
}) => {
  const uniqueId = `checkbox-${uuid()}`;

  return (
    <div className={twMerge("flex items-center gap-1 w-full", className)}>
      <input
        className="h-4 w-4 accent-accent cursor-pointer"
        type="checkbox"
        id={uniqueId}
        {...props}
      />
      <label className="text-text w-full cursor-pointer" htmlFor={uniqueId}>
        {label ?? props?.value}
      </label>
    </div>
  );
};
