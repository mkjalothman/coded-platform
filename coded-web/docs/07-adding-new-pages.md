# How to Add New Pages

## Overview

CODED Web uses the Next.js App Router. Pages are files named `page.tsx` inside the `app/` directory tree.

## Step-by-Step

### 1. Create the Route

Create a new directory and `page.tsx` under the appropriate route group:

```
app/(marketing)/about/page.tsx      → /about
app/(marketing)/programs/page.tsx   → /programs
app/(marketing)/apply/page.tsx      → /apply
```

The `(marketing)` route group applies the shared layout (Navbar + Footer) automatically.

### 2. Write the Page Component

```tsx
// app/(marketing)/about/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { colors } from "@/design-system";

export default function AboutPage() {
  return (
    <>
      <Container background={colors.surface.light}>
        <SectionHeader
          eyebrow="ABOUT US"
          title="Kuwait's First Coding Bootcamp"
          subtitle="Transforming careers since 2019"
        />
        {/* Page content using UI primitives */}
      </Container>
    </>
  );
}
```

### 3. Add Navigation

Add the page to the navigation data in `data/navigation.ts`:

```ts
export const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "/about" },      // ← Add here
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];
```

### 4. Compose with Sections

Build pages by composing existing section components and UI primitives. Avoid creating one-off styled elements — use the design system tokens.

## Page Structure Conventions

- Use `Container` for consistent section spacing and max-width.
- Use `SectionHeader` for section titles.
- Use `Reveal` to add scroll-triggered animations.
- Import colors, spacing, and typography from `design-system/`.
- Import content data from `data/`.

## Static vs. Dynamic Pages

By default, pages in the `(marketing)` group are **statically generated**. If your page needs server-side data fetching on each request, export a dynamic configuration:

```tsx
export const dynamic = "force-dynamic";
```

## Metadata

Add page metadata for SEO:

```tsx
export const metadata = {
  title: "About | CODED",
  description: "Learn about Kuwait's first coding bootcamp.",
};
```
