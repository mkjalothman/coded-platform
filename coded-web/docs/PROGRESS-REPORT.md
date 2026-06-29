# CODED Platform -- Progress Report

**Date:** June 29, 2026
**Project:** coded-platform (marketing website)
**Live URL:** https://coded-platform.vercel.app/
**Repository:** https://github.com/mkjalothman/coded-platform

---

## Summary

Over two days (June 28-29), we built a complete marketing website for CODED from scratch and connected it to a Supabase backend. The site is live on Vercel with auto-deploy from GitHub.

---

## What was built (June 28)

### Homepage -- 10 sections, fully responsive
- Hero with animated headline, CTA buttons, and teal accent branding
- Bootcamp grid (4 programs: Cybersecurity, AI App Developer, Agentic AI, AI & Data Science)
- "Who is CODED for?" audience cards (Kids, Youth, Adults)
- Graduate testimonials (3 quotes with avatar initials)
- Company logo marquee (10 Kuwait companies: Zain, NBK, Boubyan Bank, etc.)
- Animated stats bar (500+ Graduates, 50+ Company Partners, 10 Years, 4 Active Tracks)
- "How CODED actually teaches" process steps
- FAQ accordion (6 questions)
- CTA section with "Apply Now"
- 4-column footer with social links

### AI chat widget
- Floating chat bubble (bottom-right corner)
- Claude-powered assistant that knows all CODED programs
- Streaming responses via server-side API route

### Animations
- Scroll-triggered reveals on every section (Framer Motion)
- Staggered card entrances
- Count-up animated stat counters
- Infinite company logo marquee
- Hover effects on cards and buttons

### Vercel deployment
- Auto-deploys from `main` branch
- Turbopack builds

---

## What was built (June 29)

### Design system and architecture
- Centralized token system: `colors.ts`, `typography.ts`, `spacing.ts`, `motion.ts`
- Every hardcoded value in 13 component files replaced with design system tokens
- Reusable UI primitives: Button, Card, Badge, Container, SectionHeader
- Motion system with 6 easing curves, 6 reveal variants, 6 hover interactions, spring presets

### Supabase backend
- 8 database tables created and seeded with real content
- Row Level Security: public read on content tables, public insert only on applications
- Typed TypeScript client for both server and browser
- Homepage converted to async server component fetching from Supabase
- Hardcoded fallback if Supabase is unavailable

### Apply Now form
- Modal form accessible from every "Apply Now" button on the page
- Fields: Full Name, Email (validated), Phone, Program (auto-filled from bootcamp card)
- Submits to Supabase `applications` table
- Success confirmation and error handling

### Bug fixes
- **Layout centering:** All sections were pushed left due to body flex layout breaking `margin: 0 auto`. Fixed by adding `width: 100%` to container styles.
- **Stats showing zeros:** AnimatedCounter started at 0 and only counted up when scrolled into view. If the animation never fired, it stayed at 0. Fixed by initializing with the target value.
- **Production 500 error:** After connecting Supabase, the live site crashed because env vars weren't set in Vercel. `createServerClient` throws when URL/key are undefined. Fixed with defensive env var checking and graceful fallback.

---

## What's working now

| Feature                     | Status |
| --------------------------- | ------ |
| Homepage renders correctly  | Done   |
| All sections centered       | Done   |
| Content from Supabase       | Done   |
| Hardcoded fallback          | Done   |
| Stats show real numbers     | Done   |
| Apply Now form              | Done   |
| Applications save to DB     | Done   |
| Responsive mobile layout    | Done   |
| Scroll animations           | Done   |
| Vercel auto-deploy          | Done   |

---

## What's still pending

| Item                              | Priority | Notes |
| --------------------------------- | -------- | ----- |
| AI chat backend (ANTHROPIC_API_KEY on Vercel) | Medium | Widget is built; needs API key in Vercel env vars to work in production |
| FAQs and Steps from Supabase      | Low      | Tables exist and are seeded; sections still read from hardcoded `data/` |
| Program detail pages (`/programs/[slug]`) | Medium | Only the homepage exists currently |
| Contact form / email integration  | Medium   | Resend SDK is installed but not wired up |
| SEO meta tags per page            | Low      | Only root layout has meta tags |
| Analytics                         | Low      | No tracking installed |
| Content images / logos             | Medium   | Company logos are text-only (no image assets) |

---

## Technical debt

- `@supabase/ssr` generic type inference returns `never` for `.from()` calls -- worked around with type assertions
- Tailwind CSS v4 classes are unreliable in some contexts; inline styles used throughout as a workaround
- The `"use client"` / server component boundary could be tighter -- some section components are marked client but only need it for Framer Motion

---

## Team access

- **Supabase dashboard:** https://supabase.com/dashboard (project: coded-platform)
- **Vercel dashboard:** https://vercel.com (project: coded-platform)
- **GitHub repo:** https://github.com/mkjalothman/coded-platform
- **Non-coder content guide:** See `docs/ADDING-CONTENT.md` for how to add programs, testimonials, stats, etc. via the Supabase table editor
