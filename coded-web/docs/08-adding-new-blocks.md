# How to Add New Blocks (Section Components)

## Overview

"Blocks" are full-width section components that compose a page. Each block is a self-contained React component in `components/sections/`.

## Step-by-Step

### 1. Create the Data (if needed)

If your block displays structured content, add the data to the appropriate file in `data/`:

```ts
// data/programs.ts
export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export const partners: Partner[] = [
  { name: "Zain", logo: "/logos/zain.svg", url: "https://zain.com" },
  // ...
];
```

### 2. Create the Section Component

```tsx
// components/sections/PartnersSection.tsx
"use client";

import { colors, shadows } from "@/design-system";
import { fontSize, fontWeight } from "@/design-system/typography";
import { spacing, radius } from "@/design-system/spacing";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { partners } from "@/data/programs";

export default function PartnersSection() {
  return (
    <Container background={colors.surface.light}>
      <SectionHeader
        eyebrow="OUR PARTNERS"
        title="Trusted by Leading Companies"
      />
      <Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: spacing.gap.lg,
        }}>
          {partners.map((partner) => (
            <div key={partner.name} style={{
              padding: spacing.gap.lg,
              borderRadius: radius.card,
              backgroundColor: colors.surface.white,
              textAlign: "center",
            }}>
              {partner.name}
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
```

### 3. Add to a Page

Import and place the section in the page's component tree:

```tsx
// app/(marketing)/page.tsx
import PartnersSection from "@/components/sections/PartnersSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BootcampGrid />
      <PartnersSection />   {/* ← Add here */}
      <CTASection />
    </>
  );
}
```

## Checklist

- [ ] Data types and content defined in `data/`
- [ ] All colors, spacing, fonts imported from `design-system/`
- [ ] No hardcoded hex values, pixel sizes, or content strings
- [ ] Uses `Container` for consistent spacing
- [ ] Uses `SectionHeader` for titles (if applicable)
- [ ] Wrapped in `Reveal` or `StaggerGrid` for scroll animation
- [ ] Added `"use client"` directive if using hooks, state, or event handlers
- [ ] Composed into the target page

## Existing Blocks for Reference

| Block | Pattern | Good Example Of |
|-------|---------|-----------------|
| `FAQSection` | Accordion with AnimatePresence | Interactive state + animation |
| `BootcampGrid` | StaggerGrid + Card + data mapping | Grid layout with data |
| `StatsBar` | AnimatedCounter + useInView | Scroll-triggered animations |
| `TestimonialSection` | Card variant="dark" + data mapping | Dark-themed content cards |
