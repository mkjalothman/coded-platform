"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "I'm a university student",
  "Training for my company",
  "My kid wants to learn to code",
  "Which bootcamp is right for me?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || streaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: err.error || "Something went wrong. Please try again.",
          },
        ]);
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

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
                assistantText += parsed.text;
                setMessages([
                  ...newMessages,
                  { role: "assistant", content: assistantText },
                ]);
              } catch {}
            }
          }
        }
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    }

    setStreaming(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#00b8a9",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,184,169,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,184,169,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,184,169,0.4)";
        }}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            zIndex: 9998,
            width: "min(420px, calc(100vw - 48px))",
            height: "min(600px, calc(100vh - 140px))",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 12px 48px rgba(0,0,0,0.25)",
            animation: "chatSlideUp 0.25s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#0d1436",
              padding: "20px 24px",
              borderBottom: "1px solid #1e2d6b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#00b8a9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
              </div>
              <div>
                <div style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>
                  CODED Assistant
                </div>
                <div style={{ color: "#8892b0", fontSize: "12px" }}>
                  Find your perfect program
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#0a0f2e",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div>
                <div
                  style={{
                    backgroundColor: "#111d4a",
                    borderRadius: "16px",
                    borderTopLeftRadius: "4px",
                    padding: "16px",
                    color: "#e2e8f0",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    border: "1px solid #1e2d6b",
                    marginBottom: "16px",
                  }}
                >
                  Hey! 👋 I&apos;m CODED&apos;s AI assistant. I can help you find the right
                  program — whether it&apos;s for you, your kid, or your team. What brings
                  you here?
                </div>

                {/* Starter chips */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #1e2d6b",
                        borderRadius: "999px",
                        padding: "8px 16px",
                        color: "#00b8a9",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#111d4a";
                        e.currentTarget.style.borderColor = "#00b8a9";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "#1e2d6b";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius: "16px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                    ...(msg.role === "user"
                      ? {
                          backgroundColor: "#00b8a9",
                          color: "white",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          backgroundColor: "#111d4a",
                          color: "#e2e8f0",
                          borderTopLeftRadius: "4px",
                          border: "1px solid #1e2d6b",
                        }),
                  }}
                >
                  {msg.content}
                  {streaming && i === messages.length - 1 && msg.role === "assistant" && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "14px",
                        backgroundColor: "#00b8a9",
                        marginLeft: "2px",
                        animation: "blink 1s infinite",
                        verticalAlign: "text-bottom",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              backgroundColor: "#0d1436",
              padding: "16px 20px",
              borderTop: "1px solid #1e2d6b",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              style={{ display: "flex", gap: "8px" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about CODED programs..."
                disabled={streaming}
                style={{
                  flex: 1,
                  backgroundColor: "#111d4a",
                  border: "1px solid #1e2d6b",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                style={{
                  backgroundColor: streaming || !input.trim() ? "#1e2d6b" : "#00b8a9",
                  border: "none",
                  borderRadius: "12px",
                  width: "44px",
                  height: "44px",
                  cursor: streaming || !input.trim() ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background-color 0.15s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>

          <style>{`
            @keyframes chatSlideUp {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
