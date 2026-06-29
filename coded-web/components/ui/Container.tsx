import { containerStyle, sectionStyle } from "@/design-system/spacing";

interface ContainerProps {
  children: React.ReactNode;
  as?: "section" | "div";
  bg?: string;
  padding?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function Container({
  children,
  as: Tag = "section",
  bg = "transparent",
  padding,
  id,
  style,
}: ContainerProps) {
  return (
    <Tag id={id} style={{ ...sectionStyle(bg, padding), ...style }}>
      <div style={containerStyle}>
        {children}
      </div>
    </Tag>
  );
}
