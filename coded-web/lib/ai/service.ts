import type { ChatMessage, StreamCallbacks, AIServiceConfig } from "./types";

const DEFAULT_CONFIG: AIServiceConfig = {
  endpoint: "/api/chat",
  maxTokens: 512,
};

export function createAIService(config: Partial<AIServiceConfig> = {}) {
  const merged = { ...DEFAULT_CONFIG, ...config };

  async function stream(messages: ChatMessage[], callbacks: StreamCallbacks) {
    try {
      const res = await fetch(merged.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        const err = await res.json();
        callbacks.onError(err.error || "Something went wrong. Please try again.");
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                callbacks.onChunk(parsed.text);
              } catch {}
            }
          }
        }
      }

      callbacks.onDone();
    } catch {
      callbacks.onError("Connection error. Please try again.");
    }
  }

  return { stream };
}

export const chatService = createAIService();
export const recommendService = createAIService({ endpoint: "/api/recommend" });
