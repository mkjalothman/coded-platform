export type { ChatMessage, StreamCallbacks, AIServiceConfig } from "./types";
export { chatService as default, chatService, createAIService } from "./service";

import { chatService } from "./service";
import type { ChatMessage, StreamCallbacks } from "./types";

/**
 * @deprecated Use chatService.stream() or the useChat hook instead.
 */
export async function streamChat(
  messages: ChatMessage[],
  onChunk: StreamCallbacks["onChunk"],
  onDone: StreamCallbacks["onDone"],
  onError: StreamCallbacks["onError"]
) {
  return chatService.stream(messages, { onChunk, onDone, onError });
}
