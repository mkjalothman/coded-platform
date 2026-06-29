"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { colors, shadows, overlay } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { radius, spacing } from "@/design-system/spacing";
import { cssTransition } from "@/design-system/motion";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  programSlug?: string;
  programName?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ApplyModal({ open, onClose, programSlug, programName }: ApplyModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const reset = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setStatus("idle");
    setErrorMsg("");
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setErrorMsg("Full name is required.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("applications") as any).insert({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        program_slug: programSlug || null,
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.text.heading,
    backgroundColor: colors.surface.light,
    border: `1.5px solid ${colors.border.light}`,
    borderRadius: radius.input,
    outline: "none",
    transition: cssTransition.all,
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: fontSize.small,
    fontWeight: fontWeight.semibold,
    color: colors.text.heading,
    marginBottom: "6px",
    display: "block",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: overlay.backdrop,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.surface.white,
              borderRadius: radius.card,
              padding: "40px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: shadows.chatPanel,
              position: "relative",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: colors.text.body,
                cursor: "pointer",
                lineHeight: 1,
                padding: "4px",
              }}
            >
              ✕
            </button>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: spacing.gap.md }}>✓</div>
                <h3 style={{
                  fontSize: fontSize.h3,
                  fontWeight: fontWeight.bold,
                  color: colors.text.heading,
                  marginBottom: spacing.gap.sm,
                }}>
                  Application Submitted
                </h3>
                <p style={{
                  color: colors.text.body,
                  fontSize: fontSize.body,
                  lineHeight: lineHeight.relaxed,
                  marginBottom: spacing.gap.lg,
                }}>
                  We&apos;ll be in touch soon. Check your inbox at <strong>{email}</strong>.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    ...inputStyle,
                    backgroundColor: colors.brand.teal,
                    color: colors.text.headingLight,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: fontWeight.bold,
                    textAlign: "center",
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontSize: fontSize.h3,
                  fontWeight: fontWeight.bold,
                  color: colors.text.heading,
                  marginBottom: "4px",
                }}>
                  Apply Now
                </h3>
                {programName && (
                  <p style={{
                    color: colors.brand.teal,
                    fontSize: fontSize.small,
                    fontWeight: fontWeight.semibold,
                    marginBottom: spacing.gap.lg,
                  }}>
                    {programName}
                  </p>
                )}
                {!programName && <div style={{ marginBottom: spacing.gap.lg }} />}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: spacing.gap.md }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Fatima Al-Rashidi"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+965 xxxx xxxx"
                      style={inputStyle}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{
                      color: colors.audience.kids,
                      fontSize: fontSize.small,
                      fontWeight: fontWeight.medium,
                      margin: 0,
                    }}>
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                      width: "100%",
                      padding: "14px",
                      fontSize: fontSize.body,
                      fontWeight: fontWeight.bold,
                      color: colors.text.headingLight,
                      backgroundColor: status === "submitting" ? colors.brand.tealDark : colors.brand.teal,
                      border: "none",
                      borderRadius: radius.input,
                      cursor: status === "submitting" ? "not-allowed" : "pointer",
                      transition: cssTransition.all,
                      opacity: status === "submitting" ? 0.7 : 1,
                    }}
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
