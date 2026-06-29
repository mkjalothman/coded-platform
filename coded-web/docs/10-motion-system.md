# Motion System

## Overview

The motion system in `design-system/motion.ts` centralizes all animation logic. Every animation in the application — scroll reveals, hover interactions, stagger entrances, accordion expand/collapse, marquee scrolling, and CSS transitions — references tokens from this single file.

No component contains hardcoded easing curves, durations, or animation configurations.

## Architecture

```
design-system/motion.ts          ← Single source of truth
    ↓
components/motion/               ← Reusable animation wrappers
├── Reveal.tsx                   ← Scroll-triggered entrance
├── StaggerGrid.tsx              ← Orchestrated children entrance
├── HoverCard.tsx                ← Hover lift effect
├── Marquee.tsx                  ← Infinite horizontal scroll
└── AnimatedCounter.tsx          ← Number count-up animation
    ↓
components/sections/             ← Section components consume motion wrappers
components/layout/               ← Layout components use cssTransition tokens
components/chat/                 ← Chat widget uses cssTransition tokens
```

## Easing Curves

| Token | Value | Use Case |
|-------|-------|----------|
| `easing.smooth` | `[0.25, 0.1, 0.25, 1.0]` | General-purpose smooth motion |
| `easing.apple` | `[0.22, 1.0, 0.36, 1.0]` | Primary UI interactions — fast attack, gentle settle |
| `easing.overshoot` | `[0.34, 1.56, 0.64, 1.0]` | Entrance animations that need perceived snap |
| `easing.gentleOut` | `[0.0, 0.0, 0.58, 1.0]` | Exit animations, collapse transitions |
| `easing.linear` | `[0, 0, 1, 1]` | Marquee / infinite loops |
| `easing.elastic` | `[0.68, -0.55, 0.27, 1.55]` | Playful spring-like effects |

## Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `duration.instant` | 0.1s | Micro-interactions (icon rotation) |
| `duration.fast` | 0.2s | Hover states, color transitions |
| `duration.normal` | 0.35s | Standard UI transitions |
| `duration.medium` | 0.5s | Scroll reveals, stagger items |
| `duration.slow` | 0.7s | Hero entrance, emphasis |
| `duration.slower` | 1.0s | Page-level orchestration |
| `duration.counter` | 2.0s | Animated number counters |

## Spring Presets

Physics-based springs for Framer Motion:

```ts
spring.gentle  // Soft, natural — card movements
spring.snappy  // Quick, responsive — buttons, toggles
spring.bouncy  // Playful — badges, notifications
```

## Reveal Variants

Six scroll-triggered entrance patterns:

```tsx
import Reveal from "@/components/motion/Reveal";

<Reveal variant="fadeUp">...</Reveal>      // Default — fade + slide up
<Reveal variant="fadeDown">...</Reveal>     // Fade + slide down
<Reveal variant="fadeIn">...</Reveal>       // Pure opacity fade
<Reveal variant="fadeScale">...</Reveal>    // Fade + subtle scale
<Reveal variant="slideLeft">...</Reveal>    // Fade + slide from left
<Reveal variant="slideRight">...</Reveal>   // Fade + slide from right
```

## Hover Interactions

```ts
hover.card           // Lift + scale + shadow — for cards
hover.cardSubtle     // Gentle lift — for less prominent cards
hover.buttonScale    // Scale up/down — standard buttons
hover.buttonScaleLarge // Larger scale — CTA buttons
hover.glow           // Teal glow shadow — brand emphasis
hover.lift           // Simple Y lift — minimal hover
```

## Stagger Orchestration

```tsx
import StaggerGrid from "@/components/motion/StaggerGrid";

<StaggerGrid staggerDelay={0.08}>
  {items.map(item => <Card key={item.id}>...</Card>)}
</StaggerGrid>
```

## Hero Entrance

```ts
heroStagger.delays  // [0.15, 0.3, 0.5, 0.7] — orchestrated entrance timing
heroStagger.transition(delay)  // Returns { duration, delay, ease }
```

## Accordion

```ts
accordion.expand     // { initial, animate, exit, transition } — for AnimatePresence
accordion.rotate(isOpen)  // Returns { animate, transition } — for +/× icon
```

## Marquee

```ts
marquee.animate             // { x: ["0%", "-50%"] }
marquee.transition(duration) // Infinite linear loop config
```

## CSS Transitions

For inline `style={{ transition }}` on non-Framer elements:

```ts
cssTransition.color      // "color 0.2s cubic-bezier(...)"
cssTransition.background // "background-color 0.2s cubic-bezier(...)"
cssTransition.all        // "all 0.2s cubic-bezier(...)"
cssTransition.allSlow    // "all 0.35s cubic-bezier(...)"
cssTransition.transform  // "transform 0.2s cubic-bezier(...)"
cssTransition.shadow     // "box-shadow 0.35s cubic-bezier(...)"
```

## Navbar

```ts
navbar.transition  // Pre-built CSS transition string for navbar scroll state
```

## Adding New Animations

1. Define the variant/preset in `design-system/motion.ts`.
2. Export it from `design-system/index.ts`.
3. Import and use in your component.
4. Never hardcode `duration`, `ease`, or `transition` strings in components.

## Design Principles

- **Apple-level quality**: Fast attack, gentle settle. Motion should feel responsive yet smooth.
- **Consistency**: Every animation uses the same easing curves and duration scale.
- **Performance**: Animations target `transform` and `opacity` (GPU-composited properties) whenever possible.
- **Restraint**: Motion enhances comprehension, not decoration. Subtle > dramatic.
