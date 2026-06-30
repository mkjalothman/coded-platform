"use client";

import { useState, useEffect } from "react";

interface Props {
  lines: string[];
  speed?: number;
}

export default function TypewriterText({ lines, speed = 50 }: Props) {
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", ""]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    if (currentChar < lines[currentLine].length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = lines[currentLine].slice(0, currentChar + 1);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine, lines, speed, done]);

  return (
    <>
      <span style={{ display: "block" }}>{displayedLines[0]}</span>
      <span style={{ color: "var(--theme-accent)", display: "block" }}>
        {displayedLines[1]}
        {!done && (
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "0.85em",
              backgroundColor: "var(--theme-accent)",
              marginLeft: "4px",
              verticalAlign: "middle",
              animation: "blink 1s steps(1) infinite",
            }}
          />
        )}
      </span>
    </>
  );
}
