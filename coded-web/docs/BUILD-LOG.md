# Build Log

Chronological journal of everything built, every tool used, and every problem hit and fixed. All dates and commit messages are from the real git history.

---

## Day 1 -- 2026-06-28

### Session 1: Project scaffold and initial homepage

**Commits:**
- `b2a4917` init: project setup
- `e9e5fb0` init: add coded-web project setup
- `7f3761c` feat: scaffold Next.js with design system, Navbar, Footer
- `6e2c292` Merge scaffold into main

**What was built:**
- Initialized Next.js 16.2.9 project with TypeScript, Tailwind CSS v4, App Router
- Created initial Navbar and Footer components
- Set up project structure under `coded-web/`

**Tools used:** Claude Code (CLI), GitHub MCP

---

### Session 2: Vercel deployment and homepage content

**Commits:**
- `fb59e03` fix: add vercel.json with rootDirectory and framework config
- `fe05184` fix: move vercel.json into coded-web with valid schema
- `01ea157` fix: match real coded.kw mixed theme -- navy hero + light sections
- `c07e5ea` fix: layout spacing and card styles
- `2daf9fb` feat: complete homepage landing page rebuild
- `a67d019` feat: rebuild homepage with inline styles

**What was built:**
- Full homepage with hero, bootcamp grid, audience cards, company logos, stats, CTA, footer
- Navy hero + light content sections matching coded.kw branding
- Switched from Tailwind classes to inline styles (Tailwind v4 class rendering was unreliable at the time)

**Problems hit:**
- `vercel.json` placement: Vercel couldn't find the Next.js project. Fixed by moving config into `coded-web/` and setting `rootDirectory`.
- Tailwind class rendering: Some Tailwind classes weren't applying at runtime. Switched to inline styles throughout.

**Tools used:** Claude Code, Vercel MCP (deployment, project config)

---

### Session 3: Testimonials, animations, and AI chat

**Commits:**
- `999bb86` feat: center hero, add testimonials and how it works sections
- `56b11e1` feat: add AI chat assistant widget powered by Claude
- `a6d1bb7` feat: add Framer Motion animations and fix chat error handling
- `41bfdf0` fix: show friendly error messages in chat instead of raw API errors

**What was built:**
- Testimonials section with 3 graduate quotes
- "How it works" section with 4-step process
- AI chat widget: floating teal bubble, slide-up panel, Claude-powered via `/api/chat`
- Framer Motion animations: Reveal (scroll-triggered), StaggerGrid, AnimatedCounter, Marquee, HoverCard
- Chat error handling with user-friendly messages

**Problems hit:**
- Chat widget showed raw API error strings. Fixed with try/catch and friendly fallback messages.
- Hero section wasn't vertically centered. Fixed with flexDirection column and paddingBottom.

**Tools used:** Claude Code, Anthropic SDK (`@anthropic-ai/sdk`)

---

### Session 4: Design refinement pass

**Commits:**
- `0356e38` feat: apply 8-point design refinement pass to homepage

**What was built:**
- Typography system with clamped hero/h2 sizes and consistent font weights
- Standardized 96px section spacing rhythm
- Polished buttons with gradient + shadow
- Unified card elevation system
- Navbar with backdrop blur on scroll
- Structured 4-column footer with social icons
- Responsive breakpoints on all grid sections
- Extracted all sections into dedicated component files

**Tools used:** Claude Code

---

## Day 2 -- 2026-06-29

### Session 5: Architecture refactor and design system

**Commits:**
- `37f3745` merge: resolve conflicts with main, keep refined design + main features
- `32726ee` refactor: introduce design system, data layer, and reusable UI primitives
- `14088f0` fix: enforce design system token consistency across all components
- `498cdef` feat: add AI service layer with chat hooks and program recommendations

**What was built:**
- `design-system/` directory: `colors.ts`, `typography.ts`, `spacing.ts`, `motion.ts` -- all hardcoded values extracted into tokens
- `data/` directory: `programs.ts`, `testimonials.ts`, `navigation.ts` -- content separated from presentation
- `components/ui/` primitives: Button, Card, Badge, SectionHeader, Container
- AI service layer: factory pattern with streaming, `useChat` and `useRecommendation` hooks, system prompt
- Full audit replacing every hardcoded color/spacing/animation value with design system tokens

**Problems hit:**
- Merge conflicts between the design refinement branch and main (which had the chat widget). Resolved by keeping both.

**Tools used:** Claude Code, GitHub MCP

---

### Session 6: Motion system

**Commits:**
- `1998c8a` feat: build production-grade centralized motion system

**What was built:**
- Rewrote `design-system/motion.ts` with:
  - 6 easing curves (smooth, apple, overshoot, gentleOut, linear, elastic)
  - Duration scale from 0.1s to 2s
  - 3 spring presets (gentle, snappy, bouncy)
  - 6 reveal variants (fadeUp, fadeDown, fadeIn, fadeScale, slideLeft, slideRight)
  - 6 hover interactions (card, cardSubtle, buttonScale, buttonScaleLarge, glow, lift)
  - Accordion, marquee, navbar, cssTransition presets
- Refactored all 13 component files to use centralized motion tokens (zero inline animation values)

**Tools used:** Claude Code

---

### Session 7: Layout centering bug fix

**Commits:**
- `524b666` docs: add full project documentation (9 guides)
- `c118ee2` fix: align BootcampGrid layout with AudienceSection spacing tokens
- `4f2d0c8` fix: center all sections by adding explicit width to container styles
- `2cd5e70` Merge pull request #1 (PR merged into main)

**What was built:**
- 9 documentation guides in `docs/`

**Problems hit:**
- **Layout centering bug:** All sections were pushed to the left with a large empty gap on the right. Root cause: `<body className="min-h-full flex flex-col">` in `app/layout.tsx` prevented `margin: 0 auto` from centering container divs. Fixed by adding `width: "100%"` to both `containerStyle` and `sectionStyle` in `design-system/spacing.ts`.
- Initially thought only BootcampGrid was affected. User screenshots revealed ALL sections were misaligned. The body flex layout was the root cause, not individual section styles.

**Tools used:** Claude Code, Playwright (automated screenshots for visual verification)

---

### Session 8: Supabase backend setup

**Commits:**
- `de114d6` feat: add Supabase schema types and typed client helpers

**What was built:**
- 8 Supabase tables: programs (4 rows), audiences (3), testimonials (3), companies (10), stats (4), faqs (6), steps (4), applications (0)
- Full `Database` TypeScript interface in `lib/supabase/types.ts` with Row/Insert/Update types for all tables
- Typed server client (`lib/supabase/server.ts`) and browser client (`lib/supabase/client.ts`)
- RLS policies: public SELECT on all content tables, public INSERT only on applications
- Seeded all tables with the real hardcoded content from `data/`

**Tools used:** Claude Code, Supabase MCP (`apply_migration`, `execute_sql`, `list_tables`)

---

### Session 9: Connect sections to Supabase

**Commits:**
- `f6d1367` feat: connect 5 sections to Supabase with hardcoded fallbacks
- `78bc3a5` feat: connect sections to Supabase backend (PR #2 squash merge)

**What was built:**
- Converted `app/(marketing)/page.tsx` from `"use client"` to async server component
- Homepage fetches programs, audiences, testimonials, companies, stats from Supabase on the server
- Each section component updated to accept data via props instead of importing from `data/`
- Field mapping: Supabase column names (e.g., `accent_color`, `bg_color`, `cta_label`) mapped to component prop names (e.g., `color`, `bg`, `cta`)
- Falls back to hardcoded data if Supabase returns null
- Fixed AnimatedCounter: initialized with `target` value instead of 0, so stats never show permanent zeros

**Tools used:** Claude Code, Supabase MCP, GitHub MCP (PR create + merge)

---

### Session 10: Production 500 error -- diagnosis and fix

**Commits:**
- `9422185` chore: trigger fresh Vercel build to pick up new env vars
- `418ae9b` fix: graceful fallback when Supabase env vars are missing

**What happened:**
After merging the Supabase connection into main, the production site at coded-platform.vercel.app returned **500 Internal Server Error** on every request.

**Diagnosis steps:**
1. Checked Vercel runtime logs via Vercel MCP (`get_runtime_logs`). Every request showed:
   ```
   Error: Your project's URL and Key are required to create a Supabase client!
   ```
2. Confirmed the Supabase tables existed and had data (via `list_tables` -- all 8 tables present with correct columns and row counts).
3. Confirmed RLS policies were correct (public SELECT on content tables).
4. Identified root cause: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` were not set in Vercel's environment variables. The `.env.local` file only works locally.
5. User added env vars to Vercel but with the wrong name (`SUPABASEANON` instead of `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Corrected.
6. User redeployed, but Vercel's "Redeploy" reuses the cached build from before env vars were added. Pushed an empty commit to trigger a fresh build.

**Fix applied:**
- Added defensive check: if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing, skip Supabase entirely and use hardcoded fallback data
- Wrapped entire fetch in try/catch so any Supabase error (network, RLS, schema mismatch) logs a warning and falls back gracefully
- Dynamic import of the Supabase client (only imported when env vars exist)
- Per-table error logging so individual query failures are diagnosable

**Lessons learned:**
- `@supabase/ssr`'s `createServerClient` throws synchronously if URL/key are undefined -- it does not return an error object
- Vercel "Redeploy" reuses the original build artifacts; new env vars require a fresh build (new commit or "Redeploy" with build cache disabled)
- Always validate env vars before calling libraries that throw on missing config

**Tools used:** Claude Code, Vercel MCP (runtime logs, deployment inspection), Supabase MCP (table verification)

---

### Session 11: Apply Now form

**Commits:**
- `5e3cada` feat: add Apply Now modal with Supabase insert

**What was built:**
- `ApplyModal` component: animated modal with Full Name, Email, Phone fields
- Email validation, loading state, success confirmation, error display
- Inserts into Supabase `applications` table via browser client
- Program pre-filled when clicking "Apply Now" from a specific bootcamp card
- Wired to all "Apply Now" buttons: bootcamp cards (4), audience cards (3), CTA section (1)
- Navbar "Apply Now" scrolls to CTA section which opens the modal

**Tools used:** Claude Code, Playwright (modal screenshot verification)
