export interface AdvisorMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AdvisorConfig {
  systemPrompt: string;
  maxTokens?: number;
}

export async function getAdvisorResponse(
  messages: AdvisorMessage[],
  config: AdvisorConfig
): Promise<string> {
  const response = await fetch("/api/advisor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, config }),
  });

  if (!response.ok) {
    throw new Error("Failed to get advisor response");
  }

  const data = await response.json();
  return data.content;
}
