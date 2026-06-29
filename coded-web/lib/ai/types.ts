export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIServiceConfig {
  endpoint: string;
  maxTokens?: number;
  temperature?: number;
}

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

export interface ProgramRecommendation {
  program: string;
  confidence: "high" | "medium" | "low";
  reason: string;
  slug: string;
}

export interface RecommendationInput {
  age?: number;
  background?: string;
  goals?: string;
  segment?: "kids" | "youth" | "adult" | "enterprise";
}
