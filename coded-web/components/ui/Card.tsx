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
      className={`bg-coded-surface border border-coded-border rounded-[16px] p-6 shadow-sm ${
        hover
          ? "transition-all duration-200 hover:shadow-md hover:border-coded-border"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
