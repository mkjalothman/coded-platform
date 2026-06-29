import { radius } from "@/design-system/spacing";

interface BadgeProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Badge({ children, style }: BadgeProps) {
  return (
    <span style={{
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "white",
      padding: "6px 16px",
      borderRadius: radius.pill,
      fontSize: "12px",
      fontWeight: 600,
      alignSelf: "flex-start",
      backdropFilter: "blur(4px)",
      ...style,
    }}>
      {children}
    </span>
  );
}
