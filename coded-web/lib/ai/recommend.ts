import { bootcamps, audiences } from "@/data/programs";
import type { RecommendationInput, ProgramRecommendation } from "./types";

export function getLocalRecommendation(input: RecommendationInput): ProgramRecommendation[] {
  const results: ProgramRecommendation[] = [];

  if (input.segment === "kids" || (input.age && input.age >= 6 && input.age <= 13)) {
    results.push({
      program: audiences[0].title,
      confidence: "high",
      reason: "Perfect age range for our kids program. Builds logic and creativity through coding.",
      slug: "kids",
    });
    return results;
  }

  if (input.segment === "youth" || (input.age && input.age >= 14 && input.age <= 24)) {
    results.push({
      program: audiences[1].title,
      confidence: "high",
      reason: "Year-round programs designed for students and fresh graduates to build real skills.",
      slug: "youth",
    });
    return results;
  }

  if (input.segment === "enterprise") {
    results.push({
      program: audiences[2].title,
      confidence: "high",
      reason: "Custom training tailored to your team's needs with evening sessions.",
      slug: "enterprise",
    });
    return results;
  }

  const goals = (input.goals || "").toLowerCase();
  const background = (input.background || "").toLowerCase();

  if (goals.includes("security") || goals.includes("cyber") || background.includes("security")) {
    results.push({
      program: bootcamps[0].title,
      confidence: "high",
      reason: "Hands-on attack and defense techniques — exactly what you're looking for.",
      slug: bootcamps[0].slug,
    });
  }

  if (goals.includes("app") || goals.includes("web") || goals.includes("full-stack") || goals.includes("fullstack")) {
    results.push({
      program: bootcamps[1].title,
      confidence: "high",
      reason: "Build full products from frontend to backend using modern tools.",
      slug: bootcamps[1].slug,
    });
  }

  if (goals.includes("agent") || goals.includes("autonomous") || goals.includes("automation")) {
    results.push({
      program: bootcamps[2].title,
      confidence: "high",
      reason: "Build autonomous AI agents that reason, plan, and execute real tasks.",
      slug: bootcamps[2].slug,
    });
  }

  if (goals.includes("data") || goals.includes("analytics") || goals.includes("machine learning") || goals.includes("ml")) {
    results.push({
      program: bootcamps[3].title,
      confidence: "high",
      reason: "Data analysis and applied AI — turn raw data into insights and decisions.",
      slug: bootcamps[3].slug,
    });
  }

  if (results.length === 0) {
    results.push({
      program: bootcamps[1].title,
      confidence: "medium",
      reason: "Our most popular bootcamp — great starting point for anyone interested in tech.",
      slug: bootcamps[1].slug,
    });
  }

  return results;
}

export const RECOMMEND_SYSTEM_PROMPT = `You are CODED's Program Recommendation Assistant. Your ONLY job is to recommend the best CODED program based on the visitor's profile.

You MUST respond with valid JSON matching this schema:
{
  "recommendations": [
    {
      "program": "program name",
      "confidence": "high" | "medium" | "low",
      "reason": "one sentence why",
      "slug": "program-slug"
    }
  ]
}

Available programs and slugs:
- "Cybersecurity" (slug: "cybersecurity") — attack & defense, threat detection
- "AI App Developer" (slug: "ai-app-developer") — full-stack AI-powered apps
- "Agentic AI Bootcamp" (slug: "agentic-ai") — autonomous AI agents
- "AI & Data Science" (slug: "ai-data-science") — data analysis, model building
- "Spark Your Kid" (slug: "kids") — ages 6-13, weekends & breaks
- "Launch Your Tech Career" (slug: "youth") — ages 14-24, year-round
- "Build Job Skills" (slug: "enterprise") — company training, evenings

Rules:
- Return 1-2 recommendations max
- Always include a reason
- If info is insufficient, set confidence to "low"
- Never invent programs`;
