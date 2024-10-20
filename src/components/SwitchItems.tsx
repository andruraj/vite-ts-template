import React, { useMemo } from "react";
import { isEmpty } from "@utils/isEmpty";
import { twMerge } from "tailwind-merge";

interface SwitchItemsProps {
  items: string[]; // The list of items to be displayed
  style?: React.CSSProperties; // CSS styles for the container
  itemsStyle?: React.CSSProperties; // CSS styles for individual items
  selected?: string | number; // The currently selected item
  onChange: (item: string) => void; // Function to handle item selection change
}

/**
 * A segmented control component for selecting from a list of items.
 * @param {SwitchItemsProps} props - Component props.
 * @returns {JSX.Element} SwitchItems component.
 */
export const SwitchItems: React.FC<SwitchItemsProps> = ({
  items = ["Item1", "Item2"],
  style,
  itemsStyle,
  selected,
  onChange,
}) => {
  // Validate props
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Items prop must be a non-empty array.");
  }

  const active = useMemo(() => {
    if (!isEmpty(selected)) {
      if (typeof selected === "string") {
        return items.indexOf(selected);
      }
      if (
        typeof selected === "number" &&
        selected >= 0 &&
        selected < items.length
      ) {
        return selected;
      }
    }
    return -1; // Default to no active item
  }, [selected, items]);

  return (
    <div
      className="bg-accent text-white shadow rounded inline-block py-0.5 px-1 select-none"
      style={{ ...style }}
    >
      {items.map((item, i) => (
        <div
          className={twMerge(
            "rounded inline-block py-2 px-3 cursor-pointer",
            active === i
              ? "bg-white text-accent font-bold shadow shadow-black animate-bounce"
              : "bg-transparent"
          )}
          onClick={() => onChange(item)}
          style={{ ...itemsStyle }}
          key={i}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
