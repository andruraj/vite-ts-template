import { isEmpty } from "@utils/isEmpty";
import { isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Arrows, CloseButton } from "./Utils";
import { Portal } from "./Portal";
import { Collapsible } from "./Collapsible";

type GroupOptions = {
  keyProp?: string;
  options: (string | number | Record<string, any> | React.ReactNode)[];
  groupName: string | number | React.ReactNode;
};

type SelectProps = {
  value: string | number;
  onChange: (
    currentOptionString: string,
    currentOptionObject: string | number | Record<string, any> | React.ReactNode
  ) => void;
  searchable?: boolean;
  placeholder?: string;
  options: (
    | string
    | number
    | Record<string, any>
    | React.ReactNode
    | GroupOptions
  )[];
  keyProp?: string;
  disabled?: boolean;
  width?: string | number;
  zIndex?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  required?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  width,
  zIndex = 1,
  options = [],
  keyProp = "",
  searchable = true,
  placeholder = "Select an Option",
  disabled = false,
  size = "md", // Default size
  required = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlighted, setHighlighted] = useState<string>("");
  const [selected, setSelected] = useState<
    string | number | Record<string, any> | React.ReactNode
  >("");
  const [selectedIndex, setSelectedIndex] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(value)) {
      setSelected(value.toString());
    }
  }, [value]);

  // Effect to handle click outside the component to collapse dropdown
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlighted("");
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("focusin", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("focusin", handleClickOutside);
    };
  }, []);

  // Effect to position the dropdown options dynamically
  useEffect(() => {
    if (optionsRef.current && selectRef.current) {
      const selectDimensions = selectRef.current.getBoundingClientRect();
      const optionsDimensions = optionsRef.current.getBoundingClientRect();
      const gap = 2;
      const windowHeight = window.innerHeight;

      let optionsTop;

      if (
        selectDimensions.bottom + gap + optionsDimensions.height >
        windowHeight
      )
        optionsTop = selectDimensions.top - gap - optionsDimensions.height;
      else optionsTop = selectDimensions.bottom + gap;

      optionsRef.current.style.top = optionsTop + "px";
      optionsRef.current.style.left = selectDimensions.left + "px";
      optionsRef.current.style.width =
        typeof width === "number"
          ? `${width}px`
          : selectDimensions.width + "px";
    }
  }, [optionsRef, selectRef, isOpen, size]);

  const handleSelect = (index: string) => {
    setSelectedIndex(index);
    setHighlighted("");
    setIsOpen(false);
    setSearch("");

    const selectedOption = getSelectedOptionByIndex(index); // Function to retrieve the selected option by index
    onChange(selectedOption, index);
  };

  // Recursive helper to retrieve selected option by index
  const getSelectedOptionByIndex = (index: string) => {
    const indexArray = index.split("-").map(Number);

    let selectedOption = [...options];
    for (let i of indexArray) {
      if (Array.isArray(selectedOption)) {
        selectedOption = selectedOption[i];
      } else if (selectedOption && selectedOption.options) {
        selectedOption = selectedOption.options[i];
      } else {
        return selectedOption;
      }
    }
    return selectedOption;
  };

  const optionsType = useMemo(() => {
    if (Array.isArray(options) && !isEmpty(options)) {
      if ((options as any[]).every((option) => typeof option === "string")) {
        return "primitive";
      }
      if ((options as any[]).every((option) => typeof option === "number")) {
        return "primitive";
      }
      if ((options as any[]).every((option) => isValidElement(option))) {
        return "element";
      }
      if (
        (options as any[]).every(
          (option) => typeof option === "object" && !isValidElement(option)
        )
      ) {
        if (
          (keyProp &&
            keyProp in options &&
            typeof options[keyProp] === "string") ||
          typeof options[keyProp] === "number"
        ) {
          return "object";
        }

        if ((options as any[]).every((option) => "groupName" in option)) {
          return "group";
        }
      }
      return "mixed";
    }

    return null;
  }, [options, keyProp]);

  const renderOptions = (options: any[], parentIndex = "") => {
    if (!optionsType) return null;

    return options.map((option, index) => {
      const currentIndex = parentIndex
        ? `${parentIndex}-${index}`
        : index.toString();

      if (typeof option === "string" || typeof option === "number") {
        // Handle primitive options
        return (
          <div
            key={currentIndex}
            className={`option ${
              highlightedIndex === currentIndex ? "highlighted" : ""
            }`}
            onClick={() => handleSelect(currentIndex)}
          >
            {option}
          </div>
        );
      }

      if (isValidElement(option)) {
        // Handle React elements
        return (
          <div
            key={currentIndex}
            className={`option ${
              highlightedIndex === currentIndex ? "highlighted" : ""
            }`}
            onClick={() => handleSelect(currentIndex)}
          >
            {option}
          </div>
        );
      }

      if (Array.isArray(option.options)) {
        // Handle grouped options (recursive)
        return (
          <div key={currentIndex} className="group">
            <div className="group-name">{option.groupName}</div>
            {renderOptions(option.options, currentIndex)} {/* Recursive call */}
          </div>
        );
      }

      if (typeof option === "object" && keyProp && keyProp in option) {
        // Handle objects with keyProp
        return (
          <div
            key={currentIndex}
            className={`option ${
              highlightedIndex === currentIndex ? "highlighted" : ""
            }`}
            onClick={() => handleSelect(currentIndex)}
          >
            {option[keyProp]}
          </div>
        );
      }

      return null; // Fallback for invalid options
    });
  };
};
