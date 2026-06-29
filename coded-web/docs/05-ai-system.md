# AI System

## Overview

The AI system provides two features:

1. **Chat Assistant** — A streaming conversational interface that helps visitors find the right CODED program.
2. **Program Recommendations** — An API that suggests bootcamp tracks based on user profile data.

Both features gracefully degrade when the Anthropic API key is unavailable.

## Architecture

```
lib/ai/
├── types.ts          # Shared type definitions
├── service.ts        # Factory-pattern AI service (streaming client)
├── chat.ts           # Chat module re-exports + deprecated wrapper
├── system-prompt.ts  # Chat system prompt
└── recommend.ts      # Recommendation logic + system prompt

hooks/
├── useChat.ts            # React hook for chat streaming
└── useRecommendation.ts  # React hook for recommendations

app/api/
├── chat/route.ts         # SSE streaming endpoint
└── recommend/route.ts    # JSON recommendation endpoint
```

## Core Types (`lib/ai/types.ts`)

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface StreamCallbacks {
  onChunk: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

interface AIServiceConfig {
  endpoint: string;
  maxTokens?: number;
  temperature?: number;
}

interface ProgramRecommendation {
  program: string;
  confidence: "high" | "medium" | "low";
  reason: string;
  slug: string;
}

interface RecommendationInput {
  age?: number;
  background?: string;
  goals?: string;
  segment?: "kids" | "youth" | "adult" | "enterprise";
}
```

## AI Service Factory (`lib/ai/service.ts`)

The service layer uses a factory pattern to create configured AI clients:

```ts
import { createAIService } from "@/lib/ai/service";

const chatService = createAIService();                              // defaults to /api/chat
const recommendService = createAIService({ endpoint: "/api/recommend" });
```

Each service instance exposes a `stream()` method that:

1. POSTs messages to the configured endpoint
2. Reads the SSE response stream
3. Calls `onChunk`, `onDone`, or `onError` callbacks

Pre-configured instances are exported:
- `chatService` — for chat streaming
- `recommendService` — for recommendations

## Chat System

### System Prompt (`lib/ai/system-prompt.ts`)

The chat assistant is configured with a detailed system prompt that defines:
- The assistant's role (CODED program advisor)
- Available programs and their details
- Response style guidelines
- Boundaries (what the assistant should and shouldn't discuss)

### API Endpoint (`app/api/chat/route.ts`)

- **Method**: POST
- **Input**: `{ messages: ChatMessage[] }`
- **Output**: SSE stream (`text/event-stream`)
- **Model**: Claude Sonnet
- **Behavior**: Streams the assistant's response token-by-token

### React Hook (`hooks/useChat.ts`)

```ts
const { messages, streaming, sendMessage, reset } = useChat();
```

| Return Value | Type | Description |
|-------------|------|-------------|
| `messages` | `ChatMessage[]` | Full conversation history |
| `streaming` | `boolean` | Whether a response is currently streaming |
| `sendMessage` | `(text: string) => void` | Send a user message |
| `reset` | `() => void` | Clear conversation |

## Recommendation System

### Local Engine (`lib/ai/recommend.ts`)

`getLocalRecommendation()` is a rule-based fallback that works without an API key:

- Matches programs based on `age`, `segment`, `background`, and `goals`
- Returns typed `ProgramRecommendation[]` with confidence levels
- Deterministic — same input always produces the same output

### AI-Powered Recommendations

When `ANTHROPIC_API_KEY` is set, the `/api/recommend` endpoint sends profile data to Claude with `RECOMMEND_SYSTEM_PROMPT`, which instructs the model to return JSON-formatted recommendations.

### API Endpoint (`app/api/recommend/route.ts`)

- **Method**: POST
- **Input**: `RecommendationInput`
- **Output**: `{ recommendations: ProgramRecommendation[], source: "ai" | "local" }`
- **Fallback chain**: AI response → JSON parse error → local engine → API error → local engine

### React Hook (`hooks/useRecommendation.ts`)

```ts
const { recommendations, loading, recommend, reset } = useRecommendation();
```

| Return Value | Type | Description |
|-------------|------|-------------|
| `recommendations` | `ProgramRecommendation[]` | Current recommendations |
| `loading` | `boolean` | Whether a request is in progress |
| `recommend` | `(input: RecommendationInput) => Promise` | Trigger recommendation |
| `reset` | `() => void` | Clear recommendations |

## Adding a New AI Feature

1. Define types in `lib/ai/types.ts`.
2. Create an API route in `app/api/your-feature/route.ts`.
3. Optionally create a service instance: `createAIService({ endpoint: "/api/your-feature" })`.
4. Create a React hook in `hooks/useYourFeature.ts`.
5. Add the `ANTHROPIC_API_KEY` check with a local fallback in the API route.
