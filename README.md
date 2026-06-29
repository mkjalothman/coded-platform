# CODED Platform

Marketing website for CODED -- Kuwait's first coding academy (est. 2015). Built with Next.js, TypeScript, Supabase, and deployed on Vercel.

**Live:** https://coded-platform.vercel.app/

## Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 16.2.9 (App Router, Turbopack)          |
| Language    | TypeScript 5                                    |
| Styling     | Tailwind CSS v4 + inline styles via design tokens |
| Animation   | Framer Motion 12                                |
| Database    | Supabase (PostgreSQL + Row Level Security)      |
| AI          | Anthropic Claude SDK (chat widget)              |
| Hosting     | Vercel (auto-deploy from `main`)                |
| Repo        | GitHub (`mkjalothman/coded-platform`)           |

## Features

- **Homepage** with 10 sections: hero, bootcamp grid, audience cards, testimonials, company marquee, stats counter, how it works, FAQ accordion, CTA, footer
- **Supabase-powered content** -- programs, audiences, testimonials, companies, and stats are fetched server-side with hardcoded fallback
- **Apply Now modal** -- form (name, email, phone, program) inserts into Supabase `applications` table; accessible from bootcamp cards, audience cards, and CTA section
- **Design system** -- centralized tokens for colors, typography, spacing, motion (no hardcoded values in components)
- **Motion system** -- scroll-triggered reveals, staggered grids, animated counters, hover interactions, infinite marquee
- **AI chat widget** -- floating Claude-powered assistant that knows CODED programs (requires `ANTHROPIC_API_KEY`)
- **Responsive** -- all grid sections collapse to single column on mobile, navbar has mobile menu

## Project Structure

```
coded-web/
  app/
    (marketing)/page.tsx    # Homepage (async server component)
    layout.tsx              # Root layout (Inter font, Tailwind)
    api/chat/route.ts       # Claude chat streaming endpoint
    api/recommend/route.ts  # Program recommendation endpoint
  components/
    sections/               # 9 page sections (BootcampGrid, StatsBar, etc.)
    ui/                     # Reusable primitives (Button, Card, Badge, ApplyModal, etc.)
    motion/                 # Animation wrappers (Reveal, StaggerGrid, Marquee, etc.)
    layout/                 # Navbar, Footer, MobileMenu
    chat/                   # ChatWidget
  design-system/            # colors.ts, typography.ts, spacing.ts, motion.ts
  data/                     # Hardcoded fallback content (programs, testimonials, navigation)
  lib/
    supabase/               # Typed server + browser clients, Database type definitions
    ai/                     # Chat service, system prompt, recommendation logic
  hooks/                    # useChat, useRecommendation
  docs/                     # Architecture guides, build log, content guide
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm

### 1. Clone and install

```bash
git clone https://github.com/mkjalothman/coded-platform.git
cd coded-platform/coded-web
npm install
```

### 2. Environment variables

Create `coded-web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ekhmqecqqbqtcumyzjia.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
ANTHROPIC_API_KEY=<your-anthropic-api-key>
```

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required for the homepage to fetch content from Supabase. Without them, the site falls back to hardcoded data.
- `ANTHROPIC_API_KEY` is only needed for the AI chat widget.

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000.

### 4. Build for production

```bash
npm run build
npm start
```

## Deployment

The project auto-deploys to Vercel on every push to `main`. The Vercel project root directory is set to `coded-web/`.

Required Vercel environment variables (Settings > Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY` (for chat widget)

## Supabase Tables

| Table          | Rows | Purpose                          | Public Access |
| -------------- | ---- | -------------------------------- | ------------- |
| `programs`     | 4    | Bootcamp cards                   | SELECT        |
| `audiences`    | 3    | "Who is CODED for?" cards        | SELECT        |
| `testimonials` | 3    | Graduate quotes                  | SELECT        |
| `companies`    | 10   | Company logo marquee             | SELECT        |
| `stats`        | 4    | Animated stats counters          | SELECT        |
| `faqs`         | 6    | FAQ accordion                    | SELECT        |
| `steps`        | 4    | "How it works" cards             | SELECT        |
| `applications` | --   | Apply Now form submissions       | INSERT only   |

All content tables have RLS enabled with public SELECT. The `applications` table allows public INSERT only (no public read).

## Documentation

- [Architecture Overview](coded-web/docs/01-architecture-overview.md)
- [Design System](coded-web/docs/02-design-system.md)
- [Component System](coded-web/docs/03-component-system.md)
- [Data Flow](coded-web/docs/04-data-flow.md)
- [Build Log](coded-web/docs/BUILD-LOG.md)
- [Adding Content (non-coder guide)](coded-web/docs/ADDING-CONTENT.md)
- [Progress Report](coded-web/docs/PROGRESS-REPORT.md)
