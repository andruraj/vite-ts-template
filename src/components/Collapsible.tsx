import { isValidElement, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { isEmpty } from "@utils/isEmpty";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  headerContent: string | number | React.ReactNode;
  bodyContent: string | number | React.ReactNode;
  isCollapsed?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  headerContent,
  bodyContent,
  isCollapsed = true,
  headerClassName = "",
  contentClassName = "",
  expandIcon,
  collapseIcon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Update internal state when 'isCollapsed' prop changes from outside
  useEffect(() => {
    if (!isEmpty(isCollapsed)) {
      setIsOpen(!isCollapsed);
    }
  }, [isCollapsed]);

  const toggleOpen = (e: React.SyntheticEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-fit select-none" {...props}>
      <div
        className={twMerge(
          "flex justify-start items-center w-full font-semibold",
          headerClassName
        )}
      >
        {!!bodyContent && (
          <span
            className={twMerge(
              "cursor-pointer inline-block",
              isOpen ? "px-1" : "px-[4.9px]"
            )}
            onClick={toggleOpen}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleOpen(e);
              }
            }}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              isValidElement(collapseIcon) ? (
                collapseIcon
              ) : (
                <>&#11167;</>
              )
            ) : isValidElement(expandIcon) ? (
              expandIcon
            ) : (
              <>&#11166;</>
            )}
          </span>
        )}
        {headerContent}
      </div>
      <div
        className={twMerge(
          "flex-col items-start w-full pl-4",
          isOpen ? "flex" : "hidden",
          contentClassName
        )}
      >
        {!isEmpty(bodyContent) &&
        (typeof bodyContent === "string" ||
          typeof bodyContent === "number" ||
          isValidElement(bodyContent)) ? (
          bodyContent
        ) : (
          <div className="w-full h-full grid place-items-center">
            Invalid Content Type
          </div>
        )}
      </div>
    </div>
  );
};
