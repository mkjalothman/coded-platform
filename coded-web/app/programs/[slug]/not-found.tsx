import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";

export default function ProgramNotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Container bg={colors.surface.white} style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: spacing.navbarHeight,
      }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <p style={{
            fontSize: "64px",
            fontWeight: fontWeight.black,
            color: colors.brand.teal,
            marginBottom: spacing.gap.md,
            lineHeight: 1,
          }}>
            404
          </p>
          <h1 style={{
            fontSize: fontSize.h2,
            fontWeight: fontWeight.black,
            color: colors.text.heading,
            marginBottom: spacing.gap.md,
          }}>
            Program not found
          </h1>
          <p style={{
            color: colors.text.body,
            fontSize: fontSize.body,
            lineHeight: lineHeight.relaxed,
            marginBottom: spacing.ctaTopMargin,
          }}>
            The program you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Link href="/#bootcamps" style={{ textDecoration: "none" }}>
            <Button>Browse All Programs →</Button>
          </Link>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
