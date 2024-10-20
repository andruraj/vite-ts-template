import React, { isValidElement, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * @typedef {Object} Tab
 * @property {React.ReactNode} header - The header content for the tab.
 * @property {React.ReactNode} content - The content for the tab.
 */

interface Tab {
  header: React.ReactNode;
  content: React.ReactNode;
}

interface TabsViewProps {
  activeTab?: number; // Optional prop for the initially active tab index
  tabs: Tab[]; // Array of tabs with headers and content
  onTabChange?: (index: number) => void; // Optional callback for tab changes
  className?: string; // Optional additional class names
}

/**
 * A multi-tab window component with responsive design.
 * @param {TabsViewProps} props - Component props.
 * @returns {JSX.Element | null} TabsView component.
 */
export const TabPanel: React.FC<TabsViewProps> = ({
  activeTab: propActiveTab = 0,
  onTabChange,
  tabs = [],
  className,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      typeof propActiveTab === "number" &&
      propActiveTab >= 0 &&
      propActiveTab < tabs.length
    ) {
      setActiveTab(propActiveTab);
    } else {
      setActiveTab(0);
    }

    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [propActiveTab, tabs]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const isRenderable = (element: React.ReactNode) =>
    (typeof element === "string" && element.trim().length > 0) ||
    isValidElement(element);

  if (!Array.isArray(tabs) || tabs.length === 0) {
    return null;
  }

  return (
    <div className={twMerge("overflow-hidden h-full w-full", className)}>
      {/* Header section */}
      <div className="flex overflow-x-auto bg-transparent flex-wrap md:flex-nowrap">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={twMerge(
              "py-2 px-4 cursor-pointer text-xs font-medium text-white rounded-t-md",
              activeTab === index
                ? "bg-secondary"
                : "bg-primary hover:bg-accent"
            )}
            onClick={() => handleTabClick(index)}
          >
            {isRenderable(tab.header) ? tab.header : "Invalid Header"}
          </div>
        ))}
      </div>

      {/* Content section */}
      <div
        className="w-full h-[calc(100%-32px)] border border-primary overflow-auto"
        ref={contentRef}
      >
        {tabs.map((tab, index) => (
          <div key={index} className={activeTab === index ? "block" : "hidden"}>
            {isRenderable(tab.content) ? tab.content : "Invalid Content"}
          </div>
        ))}
      </div>
    </div>
  );
};
