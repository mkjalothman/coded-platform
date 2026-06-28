import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are CODED's friendly AI assistant on the website coded.kw — Kuwait's first coding academy, est. 2015.

Your job: help visitors find the right CODED program based on their age, goals, and background. Keep replies short (2-4 sentences), warm, and on-brand. Use the visitor's name if they share it. Never invent programs that don't exist.

CODED PROGRAMS:

KIDS (Ages 6–13) — "Spark Your Kid"
- Weekend & school break camps
- Learn Scratch, basic web dev, game design
- Build logic, creativity, and confidence through coding
- No prior experience needed

YOUTH (Ages 14–24) — "Launch Your Tech Career"
- Programs run year-round
- Web development, app building, intro to AI
- Great for high schoolers and university students
- Portfolio projects included

ADULT BOOTCAMPS (Career changers & professionals):
1. AI App Developer — Build full-stack AI-powered apps. Learn LLMs, agents, frontend-to-backend. 12 weeks intensive.
2. Cybersecurity — Hands-on attack & defense. Threat detection, incident response. Not theory — real skills.
3. Agentic AI — Build autonomous AI agents that reason, plan, execute. Cutting-edge frameworks.
4. AI & Data Science — Data analysis, model building, turning insights into decisions.

ENTERPRISE / COMPANIES — "Build Job Skills"
- Custom training for teams
- Evening sessions so employees can attend after work
- Upskilling in AI, data, cybersecurity, and software development
- Tailored to company needs

GENERAL INFO:
- Location: Kuwait Free Trade Zone
- Contact: hello@joincoded.com, +965 6079 1018
- Website: coded.kw
- 500+ graduates, 50+ company partners, 10 years running

RULES:
- If unsure of age or goals, ask one clarifying question
- Always recommend a specific program when you have enough info
- If they ask about pricing or dates, say "Our team can share the latest schedule and pricing — reach out at hello@joincoded.com or +965 6079 1018"
- Keep the tone confident but friendly, like a helpful older sibling who works in tech
- Use short paragraphs, not bullet lists (unless comparing programs)
- End with a clear next step: "Want me to tell you more about [program]?" or "You can apply at coded.kw/apply"`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    let stream;
    try {
      stream = anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      });
    } catch {
      return Response.json(
        { error: "Sorry, the assistant is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
                )
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: "Sorry, I'm having trouble responding right now. Please try again in a moment." })}\n\n`
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
