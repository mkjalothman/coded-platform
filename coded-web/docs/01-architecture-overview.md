# Architecture Overview

## Introduction

CODED Web is the marketing website for Kuwait's first coding bootcamp. It is built with **Next.js 16** (App Router, Turbopack) and **TypeScript**, designed for performance, maintainability, and scalability.

## High-Level Architecture

```
coded-web/
├── app/                    # Next.js App Router (pages + API routes)
│   ├── (marketing)/        # Route group for public marketing pages
│   │   ├── page.tsx        # Landing page (composes section components)
│   │   └── layout.tsx      # Marketing layout (Navbar + Footer)
│   ├── api/
│   │   ├── chat/route.ts   # AI chat streaming endpoint (SSE)
│   │   └── recommend/route.ts  # Program recommendation endpoint
│   ├── layout.tsx          # Root layout (font loading, global styles)
│   └── globals.css         # Tailwind v4 + CSS custom properties
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Badge, etc.)
│   ├── sections/           # Page sections (Hero, BootcampGrid, FAQ, etc.)
│   ├── layout/             # Layout components (Navbar, Footer, MobileMenu)
│   ├── motion/             # Animation wrappers (Reveal, HoverCard, StaggerGrid)
│   └── chat/               # Chat widget
├── design-system/          # Design tokens (colors, typography, spacing, motion)
├── data/                   # Typed static content (programs, testimonials, nav)
├── lib/ai/                 # AI service layer (chat, recommendations)
├── hooks/                  # React hooks (useChat, useRecommendation)
└── docs/                   # This documentation
```

## Three-Layer Architecture

The codebase follows a strict three-layer separation:

### Layer 1: Design System (tokens)

All visual decisions — colors, font sizes, spacing, border radii, animation curves — live in `design-system/`. Components never hardcode hex values or pixel dimensions; they reference tokens.

### Layer 2: Data (content)

All static content — bootcamp descriptions, testimonials, navigation links, FAQ entries — lives in `data/`. Components receive data through imports, never embed content strings inline.

### Layer 3: Components (presentation)

Components compose tokens + data into UI. They are split into four categories:

| Category | Purpose | Example |
|----------|---------|---------|
| `ui/` | Reusable primitives | `Button`, `Card`, `Badge` |
| `sections/` | Page-level blocks | `HeroSection`, `FAQSection` |
| `layout/` | Structural wrappers | `Navbar`, `Footer` |
| `motion/` | Animation wrappers | `Reveal`, `HoverCard` |

## Key Technology Choices

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.9 | Framework (App Router + Turbopack) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | Utility-first CSS (via `@theme inline`) |
| Framer Motion | 12.x | Animations |
| Anthropic SDK | latest | AI chat + recommendations |

## Rendering Strategy

- **Static**: The marketing landing page (`/`) is statically generated at build time.
- **Dynamic**: API routes (`/api/chat`, `/api/recommend`) are server-rendered on demand.
- **Client Components**: Interactive UI (Navbar scroll behavior, ChatWidget, FAQ accordion) uses `"use client"` directive.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | No | Enables AI-powered chat and recommendations. Without it, the system gracefully falls back to local logic. |

## Build & Development

```bash
npm run dev      # Start dev server with Turbopack
npx next build   # Production build
npx next start   # Serve production build
```
