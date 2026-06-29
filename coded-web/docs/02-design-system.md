# Design System

## Overview

The design system lives in `design-system/` and provides a single source of truth for all visual tokens. Every component imports tokens from here — no hardcoded values anywhere in `components/`.

## Files

| File | Exports | Purpose |
|------|---------|---------|
| `colors.ts` | `colors`, `gradients`, `shadows`, `overlay` | Color palette, gradients, shadows, overlays |
| `typography.ts` | `fontSize`, `fontWeight`, `lineHeight`, `textStyles` | Font sizes, weights, line heights, composed styles |
| `spacing.ts` | `spacing`, `radius` | Gaps, padding, max-widths, border radii |
| `motion.ts` | `easing`, `reveal`, `stagger`, `hover`, `heroStagger` | Animation presets for Framer Motion |
| `index.ts` | All of the above | Barrel re-export |

## Color Palette

### Brand Colors

```ts
colors.brand.teal      // #00b8a9 — Primary action color
colors.brand.tealDark  // #00a896 — Hover state for teal
colors.brand.navy      // #0a0f2e — Primary dark background
colors.brand.navyDeep  // #0d1436 — Deeper dark sections
colors.brand.navyMid   // #1a2570 — Mid-tone dark backgrounds
```

### Track Colors

Each bootcamp track has a signature color:

```ts
colors.track.cybersecurity  // #1a2570
colors.track.aiAppDev       // #00b8a9
colors.track.agenticAi      // #2d6a4f
colors.track.aiDataScience  // #9b59b6
```

### Audience Colors

```ts
colors.audience.kids       // #ef4444
colors.audience.youth      // #3b82f6
colors.audience.enterprise // #0a0f2e
```

### Surface, Text, Border

Organized by context (light/dark backgrounds, heading/body text, etc.). See `colors.ts` for the full set.

## Typography

Font sizes are defined as CSS custom properties in `globals.css` (under `:root`) and referenced via `var()`:

```ts
fontSize.hero     // var(--font-size-hero) → clamp(36px, 5vw, 56px)
fontSize.h2       // var(--font-size-h2)   → clamp(28px, 4vw, 44px)
fontSize.h3       // 22px
fontSize.subtitle // 18px
fontSize.body     // 16px
fontSize.small    // 14px
fontSize.chip     // 13px
fontSize.caption  // 12px
fontSize.stat     // 64px
```

### Composed Text Styles

`textStyles` provides pre-built style objects:

```ts
textStyles.hero      // { fontSize, fontWeight, lineHeight, color }
textStyles.heading   // for section titles
textStyles.body      // for paragraphs
textStyles.bodyDark  // for text on dark backgrounds
```

## Spacing

```ts
spacing.sectionY          // 96px — vertical padding for full sections
spacing.sectionYCompact   // 56px — reduced section padding
spacing.containerMax      // 1152px — max content width
spacing.containerPadding  // 0 40px — horizontal page padding
spacing.gap.xs            // 8px
spacing.gap.sm            // 12px
spacing.gap.md            // 16px
spacing.gap.lg            // 24px
spacing.gap.xl            // 32px
spacing.gap.xxl           // 40px
spacing.gap.section       // 48px
```

### Border Radii

```ts
radius.card   // 16px
radius.button // 12px
radius.input  // 10px
radius.pill   // 999px
radius.badge  // 8px
```

## Motion

All animation values are Framer Motion-compatible objects:

```ts
reveal       // { hidden, visible, transition } — scroll-reveal entrance
stagger      // { container, item } — staggered grid children
hover.card   // { scale, transition } — card hover effect
hover.button // { scale, transition } — button hover/tap
heroStagger  // { container, item } — hero section entrance
```

## How to Extend

1. Add your token to the appropriate file in `design-system/`.
2. If it needs to be a CSS custom property (e.g., responsive font sizes using `clamp()`), add it to `:root` in `globals.css`.
3. Import and use the token in your component — never hardcode the value.

## CSS Architecture

The project uses **Tailwind CSS v4** with `@theme inline` blocks in `globals.css` for Tailwind-namespaced variables. Custom properties (like typography vars) go in `:root` because `@theme inline` only handles Tailwind's own variable namespace.

Components primarily use **inline styles** referencing design system tokens, not Tailwind utility classes. This ensures reliable rendering and tight coupling to the design system.
