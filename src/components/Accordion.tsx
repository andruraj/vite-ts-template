interface AccordionProps extends React.HTMLProps<HTMLDetailsElement> {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  ...props
}) => (
  <details
    className="open:bg-background open:shadow open:shadow-black open:p-2 rounded-md h-full overflow-hidden transition-all duration-300"
    {...props}
  >
    <summary className="text-sm leading-6 text-primary font-semibold cursor-pointer select-none">
      {title}
    </summary>
    <div className="p-3 text-sm leading-6 text-neutral-700 overflow-hidden">
      {children}
    </div>
  </details>
);
