"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";

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
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.7)" }}
          onClick={() => setShowModal(null)}
        >
          <div
            className="relative w-full max-w-xs mx-4 rounded-2xl px-7 py-8 flex flex-col gap-5"
            style={{ background: "#1a1a1a", border: `1px solid rgba(201,169,110,0.25)`, boxShadow: "0 8px 60px rgba(0,0,0,0.6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-5 text-xl leading-none"
              style={{ color: "#6b6458" }}
            >
              ✕
            </button>

            {/* Gold line top */}
            <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, marginBottom: "-8px" }} />

            <h3
              className="text-3xl text-center"
              style={{ fontFamily: "var(--font-mea), 'Mea Culpa', cursive", color: GOLD }}
            >
              RSVP
            </h3>
            <p
              className="text-sm text-center -mt-3"
              style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", color: "#8a8070" }}
            >
              {showModal === "join" ? "We'd love to know you're coming" : "We're sorry you can't make it"}
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-oranienbaum), serif", color: GOLD, fontSize: "0.6rem" }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "#111",
                  border: "1px solid rgba(201,169,110,0.2)",
                  color: CREAM,
                  fontFamily: "var(--font-oranienbaum), serif",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-oranienbaum), serif", color: GOLD, fontSize: "0.6rem" }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 000 0000"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "#111",
                  border: "1px solid rgba(201,169,110,0.2)",
                  color: CREAM,
                  fontFamily: "var(--font-oranienbaum), serif",
                }}
              />
            </div>
            {error && <p className="text-red-400 text-xs -mt-2">{error}</p>}
            <button
              onClick={() => handleSubmit(showModal === "join")}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm mt-1 disabled:opacity-50 tracking-widest uppercase"
              style={{
                background: showModal === "join"
                  ? `linear-gradient(135deg, #c9a96e, #a8844f)`
                  : "#2a2a2a",
                color: showModal === "join" ? "#0d0d0d" : "#8a8070",
                fontFamily: "var(--font-oranienbaum), serif",
                border: showModal === "join" ? "none" : "1px solid rgba(201,169,110,0.2)",
                fontSize: "0.7rem",
              }}
            >
              {loading ? "Saving…" : showModal === "join" ? "Confirm Attendance" : "Confirm"}
            </button>
          </div>
        </div>
      )}

      <section
        ref={sectionRef}
        className="w-full px-8 pt-2 pb-16 flex flex-col items-center"
        style={{ background: "#0d0d0d" }}
      >
        {/* Gold line */}
        <div className="w-24 mb-10" style={{ height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <h2
          className="mb-3"
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.8rem, 12vw, 3.5rem)",
            color: CREAM,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          Let's Celebrate
        </h2>
        <p
          className="mb-10 tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "0.65rem",
            color: "#8a8070",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s",
          }}
        >
          Please Confirm your Participation
        </p>

        <div className="w-full max-w-xs flex flex-col gap-4">
          <button
            onClick={() => { setName(""); setPhone(""); setError(""); setShowModal("join"); }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, #c9a96e, #a8844f)`,
              color: "#0d0d0d",
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              fontSize: "0.75rem",
            }}
          >
            <Image src="/icons/love.svg" alt="" width={20} height={20} className="" style={{ filter: "brightness(0)" }} />
            I Will Join
          </button>
          <button
            onClick={() => { setName(""); setPhone(""); setError(""); setShowModal("decline"); }}
            className="w-full flex items-center justify-center py-4 rounded-xl tracking-widest uppercase"
            style={{
              background: "transparent",
              color: "#8a8070",
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              fontSize: "0.75rem",
              border: "1px solid rgba(201,169,110,0.25)",
            }}
          >
            Can't Make It
          </button>
        </div>

        {done && (
          <p
            className="mt-8 text-sm text-center"
            style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", color: GOLD }}
          >
            {attending
              ? "We're so excited to celebrate with you! 🤍"
              : "We're sorry you can't make it. You'll be missed! 🤍"}
          </p>
        )}
      </section>
    </>
  );
}
