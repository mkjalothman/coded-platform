"use client";

import { useState, useRef, useEffect } from "react";
import { colors, shadows } from "@/design-system";
import { streamChat, type ChatMessage } from "@/lib/ai/chat";
import { chatStarters } from "@/data/navigation";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    let assistantText = "";
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    await streamChat(
      newMessages,
      (chunk) => {
        assistantText += chunk;
        setMessages([...newMessages, { role: "assistant", content: assistantText }]);
      },
      () => setStreaming(false),
      (error) => {
        setMessages([...newMessages, { role: "assistant", content: error }]);
        setStreaming(false);
      }
    );
  }

  return (
    <>
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
          backgroundColor: colors.brand.teal,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: shadows.chatFloat,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,184,169,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = shadows.chatFloat;
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

      {open && (
        <div style={{
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
          boxShadow: shadows.chatPanel,
          animation: "chatSlideUp 0.25s ease-out",
        }}>
          <div style={{
            backgroundColor: colors.surface.dark,
            padding: "20px 24px",
            borderBottom: `1px solid ${colors.border.dark}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: colors.brand.teal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>CODED Assistant</div>
                <div style={{ color: colors.text.bodyDark, fontSize: "12px" }}>Find your perfect program</div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: colors.brand.navy,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {messages.length === 0 && (
              <div>
                <div style={{
                  backgroundColor: colors.surface.darkCard,
                  borderRadius: "16px",
                  borderTopLeftRadius: "4px",
                  padding: "16px",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  border: `1px solid ${colors.border.dark}`,
                  marginBottom: "16px",
                }}>
                  Hey! 👋 I&apos;m CODED&apos;s AI assistant. I can help you find the right
                  program — whether it&apos;s for you, your kid, or your team. What brings
                  you here?
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {chatStarters.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${colors.border.dark}`,
                        borderRadius: "999px",
                        padding: "8px 16px",
                        color: colors.brand.teal,
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.surface.darkCard;
                        e.currentTarget.style.borderColor = colors.brand.teal;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = colors.border.dark;
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  ...(msg.role === "user"
                    ? { backgroundColor: colors.brand.teal, color: "white", borderBottomRightRadius: "4px" }
                    : { backgroundColor: colors.surface.darkCard, color: "#e2e8f0", borderTopLeftRadius: "4px", border: `1px solid ${colors.border.dark}` }),
                }}>
                  {msg.content}
                  {streaming && i === messages.length - 1 && msg.role === "assistant" && (
                    <span style={{
                      display: "inline-block",
                      width: "6px",
                      height: "14px",
                      backgroundColor: colors.brand.teal,
                      marginLeft: "2px",
                      animation: "blink 1s infinite",
                      verticalAlign: "text-bottom",
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            backgroundColor: colors.surface.dark,
            padding: "16px 20px",
            borderTop: `1px solid ${colors.border.dark}`,
          }}>
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
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
                  backgroundColor: colors.surface.darkCard,
                  border: `1px solid ${colors.border.dark}`,
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
                  backgroundColor: streaming || !input.trim() ? colors.border.dark : colors.brand.teal,
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
