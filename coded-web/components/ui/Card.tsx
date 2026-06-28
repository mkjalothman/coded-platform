interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-coded-surface border border-coded-border rounded-[12px] p-6 ${
        hover
          ? "transition-all duration-200 hover:border-coded-muted/30 hover:bg-coded-surface2"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
