import { colors, overlay } from "@/design-system";
import { fontSize, fontWeight } from "@/design-system/typography";
import { radius } from "@/design-system/spacing";

interface BadgeProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Badge({ children, style }: BadgeProps) {
  return (
    <span style={{
      backgroundColor: overlay.frostedBorder,
      color: colors.text.headingLight,
      padding: "6px 16px",
      borderRadius: radius.pill,
      fontSize: fontSize.caption,
      fontWeight: fontWeight.semibold,
      alignSelf: "flex-start",
      backdropFilter: "blur(4px)",
      ...style,
    }}>
      {children}
    </span>
  );
}
