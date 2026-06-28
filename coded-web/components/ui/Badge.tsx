interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-coded-surface2 text-coded-muted border border-coded-border ${className}`}
    >
      {children}
    </span>
  );
}
