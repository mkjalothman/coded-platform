"use client";

import { useState, useCallback } from "react";
import { getLocalRecommendation } from "@/lib/ai/recommend";
import type { RecommendationInput, ProgramRecommendation } from "@/lib/ai/types";

export function useRecommendation() {
  const [recommendations, setRecommendations] = useState<ProgramRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const recommend = useCallback(async (input: RecommendationInput) => {
    setLoading(true);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations);
        setLoading(false);
        return data.recommendations as ProgramRecommendation[];
      }
    } catch {}

    const local = getLocalRecommendation(input);
    setRecommendations(local);
    setLoading(false);
    return local;
  }, []);

  const reset = useCallback(() => {
    setRecommendations([]);
    setLoading(false);
  }, []);

  return { recommendations, loading, recommend, reset };
}
