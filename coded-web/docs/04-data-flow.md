# Data Flow Architecture

## Overview

Data in CODED Web flows through three distinct channels:

1. **Static data** — typed content imported at build time
2. **AI streaming** — real-time SSE chat from the API
3. **AI recommendations** — request/response API calls

## Static Data Flow

```
data/*.ts  →  import  →  Section Component  →  UI Primitive  →  Rendered HTML
```

All static content lives in `data/`:

| File | Exports | Consumed By |
|------|---------|-------------|
| `programs.ts` | `bootcamps`, `audiences`, `stats`, `steps`, `companies`, `faqs` | BootcampGrid, AudienceSection, StatsBar, HowItWorks, CompanyLogos, FAQSection |
| `testimonials.ts` | `testimonials` | TestimonialSection |
| `navigation.ts` | `navLinks`, `footerSections`, `socialLinks`, `chatStarters` | Navbar, Footer, MobileMenu, ChatWidget |

### Type Safety

Every data file exports TypeScript interfaces:

```ts
// data/programs.ts
export interface Bootcamp {
  title: string;
  slug: string;
  track: string;
  color: string;
  duration: string;
  description: string;
  highlights: string[];
}
```

Components import both the data and the types, ensuring compile-time safety.

## AI Chat Streaming Flow

```
User Input → useChat hook → chatService.stream()
                                    ↓
                            POST /api/chat (SSE)
                                    ↓
                            Anthropic SDK (streaming)
                                    ↓
                            SSE chunks → onChunk callback
                                    ↓
                            React state update → UI re-render
```

### Detailed Flow

1. **User types a message** in `ChatWidget`.
2. **`useChat` hook** appends the message to state, calls `chatService.stream()`.
3. **`chatService`** sends a POST request to `/api/chat` with the full message history.
4. **API route** (`app/api/chat/route.ts`) creates an Anthropic streaming response using the system prompt from `lib/ai/system-prompt.ts`.
5. **SSE chunks** are sent back as `text/event-stream`.
6. **`chatService.stream()`** reads the stream, calling `onChunk` for each text delta.
7. **`useChat` hook** accumulates chunks and updates React state, triggering re-renders.
8. **`ChatWidget`** displays the growing response with a blinking cursor animation.

### Error Handling

- If `ANTHROPIC_API_KEY` is not set, the API returns a friendly error message.
- Network errors are caught by the hook and displayed as assistant messages.
- The `streaming` flag prevents duplicate submissions during an active response.

## AI Recommendation Flow

```
User Profile → useRecommendation hook → POST /api/recommend
                                              ↓
                                    ┌─── API Key exists? ───┐
                                    │                       │
                                   Yes                      No
                                    │                       │
                            Anthropic API call      getLocalRecommendation()
                                    │                       │
                            Parse JSON response     Rule-based matching
                                    │                       │
                                    └───── Response ────────┘
                                              ↓
                                    React state update → UI
```

### Graceful Degradation

The recommendation system has three fallback levels:

1. **AI-powered**: If `ANTHROPIC_API_KEY` is set and the API call succeeds, returns Claude-generated recommendations.
2. **Parse fallback**: If Claude's response isn't valid JSON, falls back to local recommendations.
3. **Local-only**: If no API key is set or the API call fails, uses `getLocalRecommendation()` — a rule-based engine that matches programs based on age, segment, background, and goals.

## State Management

The application uses React's built-in state management:

- **`useState`** for local component state (menu open/closed, form inputs)
- **`useRef`** for mutable values that shouldn't trigger re-renders (stream accumulator, scroll containers)
- **`useCallback`** for stable function references in hooks

No external state management library (Redux, Zustand, etc.) is used. The current scale of the application doesn't require one.
