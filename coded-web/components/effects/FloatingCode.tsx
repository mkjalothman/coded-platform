"use client";

import { useEffect, useState } from "react";

const codeElements = [
  "{ }", "</>", "AI", "def", "const", "async",
  "01", "ML", "git", "npm", "=>", "API",
  "SQL", "LLM", "GPT", "RAG", "import", "return",
];

export default function FloatingCode() {
  const [elements, setElements] = useState<
    Array<{
      id: number;
      text: string;
      x: number;
      y: number;
      duration: number;
      delay: number;
      size: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    setElements(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        text: codeElements[i % codeElements.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
        size: 11 + Math.random() * 8,
        opacity: 0.06 + Math.random() * 0.1,
      }))
    );
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          style={{
            position: "absolute",
            left: el.x + "%",
            top: el.y + "%",
            fontSize: el.size + "px",
            color: "#00b8a9",
            opacity: el.opacity,
            fontFamily: "monospace",
            fontWeight: 600,
            animation: `float ${el.duration}s ease-in-out ${el.delay}s infinite alternate`,
            userSelect: "none",
          }}
        >
          {el.text}
        </div>
      ))}
    </div>
  );
}
