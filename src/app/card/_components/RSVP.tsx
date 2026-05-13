"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

export default function RSVP() {
  const [mode, setMode] = useState<"idle" | "going" | "declined">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [attending, setAttending] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [depth, setDepth] = useState({ rx: 0, tz: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    function onScroll() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      setDepth({ rx: progress * 10, tz: Math.abs(progress) * -90 });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        attending: mode === "going",
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setAttending(mode === "going");
    setDone(true);
  }

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 pt-6 pb-16 flex flex-col items-center"
      style={{ background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes rsvpHeadingDrop {
          0%   { opacity: 0; transform: perspective(900px) rotateX(65deg) translateY(-20px); filter: blur(5px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(900px) rotateX(0deg) translateY(0); }
        }
        @keyframes rsvpFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-7px); }
        }
        @keyframes rsvpFormFlip {
          0%   { opacity: 0; transform: perspective(800px) rotateX(-50deg) translateY(25px); filter: blur(3px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(800px) rotateX(0deg) translateY(0); }
        }
        @keyframes rsvpButtonRise {
          0%   { opacity: 0; transform: perspective(700px) rotateY(45deg) translateX(35px); filter: blur(3px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(700px) rotateY(0deg) translateX(0); }
        }
      `}</style>

      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `perspective(1100px) rotateX(${depth.rx}deg) translateZ(${depth.tz}px)`,
        willChange: "transform",
      }}>

      {/* Heading */}
      <div
        className="flex flex-col items-center mb-3 w-full max-w-sm"
        style={{
          opacity: visible ? 1 : 0,
          animation: visible ? "rsvpHeadingDrop 2.2s cubic-bezier(0.16,1,0.3,1) 0.1s both, rsvpFloat 5s ease-in-out 3s infinite" : "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.5rem, 12vw, 3.5rem)",
            color: GOLD,
            lineHeight: 1,
            marginBottom: 0,
          }}
        >
          Let's Celebrate
        </p>
      </div>

      {/* Subtitle */}
      <p
        className="text-center mb-8 w-full max-w-xs"
        style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.8rem",
          color: DIM,
          lineHeight: 1.85,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.1s ease 0.25s, transform 1.1s ease 0.25s",
        }}
      >
        Your presence is the greatest gift of all. Kindly respond by 25th May
        2026. We look forward to celebrating with you.
      </p>

      {/* Done state */}
      {done ? (
        <div
          className="w-full max-w-xs text-center py-8"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mea), serif",
              fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
              color: GOLD,
              marginBottom: "0.8rem",
            }}
          >
            {attending ? "We'll see you there!" : "You'll be missed."}
          </p>
          <p
            style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.8rem",
              color: DIM,
              lineHeight: 1.8,
            }}
          >
            {attending
              ? "Thank you for confirming! We can't wait to celebrate with you on June 4th. 🤍"
              : "We're sorry you can't make it. Thank you for letting us know. 🤍"}
          </p>
        </div>
      ) : (
        <>
          {/* GOING / DECLINED buttons */}
          {mode === "idle" && (
            <div
              className="w-full max-w-xs flex gap-3"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? "rsvpButtonRise 1.8s cubic-bezier(0.16,1,0.3,1) 0.5s both" : "none",
              }}
            >
              <button
                onClick={() => setMode("going")}
                className="flex-1 py-3.5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, #c9a96e, #a8844f)`,
                  color: "#0d0d0d",
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Going
              </button>
              <button
                onClick={() => setMode("declined")}
                className="flex-1 py-3.5 rounded-xl"
                style={{
                  background: "transparent",
                  color: DIM,
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  border: `1px solid rgba(201,169,110,0.25)`,
                  cursor: "pointer",
                }}
              >
                Declined
              </button>
            </div>
          )}

          {/* Inline form */}
          {mode !== "idle" && (
            <div
              className="w-full max-w-xs flex flex-col gap-5"
              style={{
                animation: "rsvpFormFlip 1.1s cubic-bezier(0.16,1,0.3,1) both",
              }}
            >

              {/* Mode indicator */}
              <p
                style={{
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.25em",
                  color: mode === "going" ? GOLD : DIM,
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {mode === "going" ? "♥  Yes, I'll be there" : "I can't make it"}
                <button
                  onClick={() => {
                    setMode("idle");
                    setError("");
                  }}
                  style={{
                    marginLeft: "1rem",
                    color: "#4a4440",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  ← back
                </button>
              </p>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "var(--font-oranienbaum), serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.28em",
                    color: GOLD,
                    textTransform: "uppercase",
                  }}
                >
                  ♥ Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{
                    background: "#111",
                    border: `1px solid rgba(201,169,110,0.18)`,
                    color: CREAM,
                    fontFamily: "var(--font-oranienbaum), serif",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "var(--font-oranienbaum), serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.28em",
                    color: GOLD,
                    textTransform: "uppercase",
                  }}
                >
                  ♥ Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+94 77 000 0000"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{
                    background: "#111",
                    border: `1px solid rgba(201,169,110,0.18)`,
                    color: CREAM,
                    fontFamily: "var(--font-oranienbaum), serif",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              {error && (
                <p
                  style={{
                    color: "#e57373",
                    fontSize: "0.75rem",
                    marginTop: "-8px",
                  }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-xl disabled:opacity-50"
                style={{
                  background:
                    mode === "going"
                      ? `linear-gradient(135deg, #c9a96e, #a8844f)`
                      : "transparent",
                  color: mode === "going" ? "#0d0d0d" : DIM,
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  border:
                    mode === "going"
                      ? "none"
                      : `1px solid rgba(201,169,110,0.25)`,
                  cursor: "pointer",
                  marginTop: "0.25rem",
                }}
              >
                {loading ? "Saving…" : "Send"}
              </button>
            </div>
          )}
        </>
      )}

      </div>
    </section>
  );
}
