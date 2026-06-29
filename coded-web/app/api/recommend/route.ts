import Anthropic from "@anthropic-ai/sdk";
import { RECOMMEND_SYSTEM_PROMPT, getLocalRecommendation } from "@/lib/ai/recommend";
import type { RecommendationInput } from "@/lib/ai/types";

export async function POST(req: Request) {
  try {
    const input: RecommendationInput = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      const local = getLocalRecommendation(input);
      return Response.json({ recommendations: local, source: "local" });
    }

    const anthropic = new Anthropic({ apiKey });

    const prompt = [
      input.age ? `Age: ${input.age}` : null,
      input.segment ? `Segment: ${input.segment}` : null,
      input.background ? `Background: ${input.background}` : null,
      input.goals ? `Goals: ${input.goals}` : null,
    ].filter(Boolean).join("\n");

    if (!prompt) {
      const local = getLocalRecommendation(input);
      return Response.json({ recommendations: local, source: "local" });
    }

    try {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 256,
        system: RECOMMEND_SYSTEM_PROMPT,
        messages: [{ role: "user", content: prompt }],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "";

      try {
        const parsed = JSON.parse(text);
        return Response.json({ recommendations: parsed.recommendations, source: "ai" });
      } catch {
        const local = getLocalRecommendation(input);
        return Response.json({ recommendations: local, source: "local" });
      }
    } catch {
      const local = getLocalRecommendation(input);
      return Response.json({ recommendations: local, source: "local" });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
