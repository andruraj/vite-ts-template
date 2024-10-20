interface BadgeProps {
  children: React.ReactNode;
  textColor?: string;
  bgColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  textColor = "white",
  bgColor = "blue",
}) => {
  return (
    <span
      className="m-1 inline-block shadow px-2 py-1 rounded-full text-xs font-semibold tracking-normal leading-none transition-all duration-300"
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
    >
      {children}
    </span>
  );
};
