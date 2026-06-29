import Navbar from "@/components/layout/Navbar";
import { colors, gradients } from "@/design-system";
import { spacing, containerStyle } from "@/design-system/spacing";

export default function ProgramLoading() {
  const shimmer: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: "8px",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <section style={{
        backgroundColor: colors.surface.dark,
        backgroundImage: gradients.heroGlow,
        paddingTop: `calc(${spacing.navbarHeight} + 64px)`,
        paddingBottom: "80px",
      }}>
        <div style={containerStyle}>
          <div style={{ ...shimmer, width: "120px", height: "16px", marginBottom: "24px" }} />
          <div style={{ ...shimmer, width: "100px", height: "28px", marginBottom: "16px", borderRadius: "999px" }} />
          <div style={{ ...shimmer, width: "60%", height: "48px", marginBottom: "24px" }} />
          <div style={{ ...shimmer, width: "80%", height: "20px", marginBottom: "12px" }} />
          <div style={{ ...shimmer, width: "70%", height: "20px", marginBottom: "40px" }} />
          <div style={{ ...shimmer, width: "160px", height: "48px", borderRadius: "999px" }} />
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
