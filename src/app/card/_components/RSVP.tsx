"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

export default function RSVP() {
  const [showModal, setShowModal] = useState<"join" | "decline" | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [attending, setAttending] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(isAttending: boolean) {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), attending: isAttending }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setShowModal(null);
    setAttending(isAttending);
    setDone(true);
  }

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.75)" }}
          onClick={() => setShowModal(null)}
        >
          <div
            className="relative w-full mx-5 rounded-2xl px-7 py-8 flex flex-col gap-5"
            style={{
              maxWidth: "360px",
              background: "#111",
              border: `1px solid rgba(201,169,110,0.22)`,
              boxShadow: "0 12px 80px rgba(0,0,0,0.7)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-5 text-lg leading-none"
              style={{ color: "#4a4440", background: "none", border: "none", cursor: "pointer" }}
            >
              ✕
            </button>

            {/* Top gold rule */}
            <div style={{
              height: "1px",
              background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
              marginBottom: "-4px",
            }} />

            {/* Title */}
            <h3 style={{
              fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
              fontSize: "2.5rem",
              color: GOLD,
              textAlign: "center",
              marginBottom: "-8px",
            }}>
              RSVP
            </h3>
            <p style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.75rem",
              color: DIM,
              textAlign: "center",
              letterSpacing: "0.12em",
              marginTop: "-4px",
            }}>
              Prathiba &amp; Pathum's Wedding
            </p>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label style={{
                fontFamily: "var(--font-oranienbaum), serif",
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                color: GOLD,
                textTransform: "uppercase",
              }}>
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "#0d0d0d",
                  border: `1px solid rgba(201,169,110,0.18)`,
                  color: CREAM,
                  fontFamily: "var(--font-oranienbaum), serif",
                }}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label style={{
                fontFamily: "var(--font-oranienbaum), serif",
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                color: GOLD,
                textTransform: "uppercase",
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 000 0000"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "#0d0d0d",
                  border: `1px solid rgba(201,169,110,0.18)`,
                  color: CREAM,
                  fontFamily: "var(--font-oranienbaum), serif",
                }}
              />
            </div>

            {error && (
              <p style={{ color: "#e57373", fontSize: "0.75rem", marginTop: "-8px" }}>{error}</p>
            )}

            {/* Submit */}
            <button
              onClick={() => handleSubmit(showModal === "join")}
              disabled={loading}
              className="w-full py-3.5 rounded-xl mt-1 disabled:opacity-50"
              style={{
                background: showModal === "join"
                  ? `linear-gradient(135deg, #c9a96e, #a8844f)`
                  : "transparent",
                color: showModal === "join" ? "#0d0d0d" : DIM,
                fontFamily: "var(--font-oranienbaum), serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                border: showModal === "join" ? "none" : `1px solid rgba(201,169,110,0.22)`,
                cursor: "pointer",
              }}
            >
              {loading ? "Saving…" : showModal === "join" ? "Confirm Attendance" : "Confirm"}
            </button>
          </div>
        </div>
      )}

      {/* Section */}
      <section
        ref={sectionRef}
        className="w-full px-6 pt-4 pb-16 flex flex-col items-center"
        style={{ background: "#0d0d0d" }}
      >
        {/* Gold rule */}
        <div className="w-full max-w-sm mb-12">
          <div style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          }} />
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mb-3" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}>
          <p style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.2rem, 10vw, 3rem)",
            color: GOLD,
            lineHeight: 1,
            marginBottom: 0,
          }}>
            the
          </p>
          <h2 style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(1.8rem, 9vw, 2.5rem)",
            color: CREAM,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: "normal",
            marginTop: 0,
          }}>
            RSVP
          </h2>
        </div>

        <p style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.65rem",
          letterSpacing: "0.28em",
          color: DIM,
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.1s ease 0.15s",
        }}>
          Please confirm your participation
        </p>

        {/* Buttons */}
        <div className="w-full max-w-xs flex flex-col gap-4">
          <button
            onClick={() => { setName(""); setPhone(""); setError(""); setShowModal("join"); }}
            className="w-full py-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, #c9a96e, #a8844f)`,
              color: "#0d0d0d",
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.72rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
            }}
          >
            ♥ &nbsp; I Will Join
          </button>
          <button
            onClick={() => { setName(""); setPhone(""); setError(""); setShowModal("decline"); }}
            className="w-full py-4 rounded-xl"
            style={{
              background: "transparent",
              color: DIM,
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.72rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              border: `1px solid rgba(201,169,110,0.22)`,
              cursor: "pointer",
            }}
          >
            Can't Make It
          </button>
        </div>

        {/* Confirmation message */}
        {done && (
          <p style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.9rem",
            color: GOLD,
            textAlign: "center",
            marginTop: "2rem",
            lineHeight: 1.8,
          }}>
            {attending
              ? "We're so excited to celebrate with you! 🤍"
              : "We'll miss you dearly. Thank you for letting us know. 🤍"}
          </p>
        )}
      </section>
    </>
  );
}
