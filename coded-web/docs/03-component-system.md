# Component System Guide

## Overview

Components are organized into four categories under `components/`:

```
components/
├── ui/         # Reusable primitives (Button, Card, Badge, etc.)
├── sections/   # Full-width page sections
├── layout/     # Navbar, Footer, MobileMenu
├── motion/     # Animation wrapper components
└── chat/       # AI chat widget
```

## UI Primitives (`components/ui/`)

### Button

Multi-variant button supporting links and click handlers.

```tsx
import Button from "@/components/ui/Button";

<Button variant="primary" href="/apply">Apply Now</Button>
<Button variant="outline" onClick={handleClick}>Learn More</Button>
<Button variant="frosted">Frosted Style</Button>
<Button variant="inverted">On Dark BG</Button>
<Button variant="track" trackColor="#1a2570">Cybersecurity</Button>
```

**Variants**: `primary` (teal fill), `outline` (teal border), `track` (custom color), `frosted` (glass effect), `inverted` (white fill, dark text)

**Props**: `variant`, `href` (renders as `<a>`), `onClick` (renders as `<button>`), `trackColor`, `className`, `children`

### Card

Container with hover animation and three visual variants.

```tsx
import Card from "@/components/ui/Card";

<Card variant="light">Light background card</Card>
<Card variant="dark">Dark background card</Card>
<Card variant="colored" backgroundColor="#1a2570">Colored card</Card>
```

### Badge

Small label/tag component.

```tsx
import Badge from "@/components/ui/Badge";

<Badge>New</Badge>
```

### SectionHeader

Reusable section title block with optional eyebrow and subtitle.

```tsx
import SectionHeader from "@/components/ui/SectionHeader";

<SectionHeader
  eyebrow="OUR PROGRAMS"
  title="Choose Your Track"
  subtitle="Find the right bootcamp for your goals"
/>
```

### Container

Section wrapper providing consistent max-width, padding, and vertical spacing.

```tsx
import Container from "@/components/ui/Container";

<Container background={colors.surface.light}>
  {/* Section content */}
</Container>
```

**Props**: `background` (CSS background value), `compact` (reduced vertical padding), `children`

## Section Components (`components/sections/`)

Each section is a self-contained block that composes UI primitives with data:

| Component | Description | Data Source |
|-----------|-------------|-------------|
| `HeroSection` | Landing hero with CTA buttons | Inline content |
| `BootcampGrid` | Grid of bootcamp track cards | `data/programs.ts` |
| `AudienceSection` | Cards for Kids, Youth, Enterprise | `data/programs.ts` |
| `StatsBar` | Animated statistics counter | `data/programs.ts` |
| `TestimonialSection` | Student testimonials carousel | `data/testimonials.ts` |
| `CompanyLogos` | Hiring partner logos | `data/programs.ts` |
| `HowItWorks` | Step-by-step process | `data/programs.ts` |
| `FAQSection` | Accordion FAQ | `data/programs.ts` |
| `CTASection` | Final call-to-action | Inline content |

## Motion Components (`components/motion/`)

### Reveal

Scroll-triggered fade-in animation wrapper.

```tsx
import Reveal from "@/components/motion/Reveal";

<Reveal>
  <SomeContent />
</Reveal>
```

### HoverCard

Adds scale-up hover effect to its children.

```tsx
import HoverCard from "@/components/motion/HoverCard";

<HoverCard>
  <div>Hoverable content</div>
</HoverCard>
```

### StaggerGrid

Staggers the entrance animation of child items.

```tsx
import StaggerGrid from "@/components/motion/StaggerGrid";

<StaggerGrid>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</StaggerGrid>
```

## Layout Components (`components/layout/`)

- **Navbar**: Fixed top navigation with scroll-aware background transition. Uses `navLinks` from `data/navigation.ts`.
- **Footer**: Multi-column footer with social links. Uses `footerSections` and `socialLinks` from `data/navigation.ts`.
- **MobileMenu**: Slide-in mobile navigation overlay.

## Chat Widget (`components/chat/`)

- **ChatWidget**: Floating chat button + expandable panel. Uses the `useChat` hook for state management and AI streaming.

## Conventions

1. All components use `"use client"` when they need interactivity (state, effects, event handlers).
2. Styling uses inline styles with design system token imports — not Tailwind classes.
3. Section components are composed on the page level (`app/(marketing)/page.tsx`), not nested in each other.
4. Data is imported from `data/`, never hardcoded in components.
