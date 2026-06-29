"use client";

import { useState, useCallback, useRef } from "react";
import { chatService } from "@/lib/ai/service";
import type { ChatMessage } from "@/lib/ai/types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const accumulatorRef = useRef("");

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setStreaming(true);
    accumulatorRef.current = "";

    setMessages([...updated, { role: "assistant", content: "" }]);

    await chatService.stream(updated, {
      onChunk: (chunk) => {
        accumulatorRef.current += chunk;
        setMessages([...updated, { role: "assistant", content: accumulatorRef.current }]);
      },
      onDone: () => setStreaming(false),
      onError: (error) => {
        setMessages([...updated, { role: "assistant", content: error }]);
        setStreaming(false);
      },
    });
  }, [messages, streaming]);

  const reset = useCallback(() => {
    setMessages([]);
    setStreaming(false);
  }, []);

  return { messages, streaming, sendMessage, reset };
}
