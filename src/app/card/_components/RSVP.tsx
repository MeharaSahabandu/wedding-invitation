"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function RSVP() {
  const [showModal, setShowModal] = useState<"join" | "decline" | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(attending: boolean) {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), attending }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setShowModal(null);
    setDone(true);
  }

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.35)" }}
          onClick={() => setShowModal(null)}
        >
          <div
            className="relative w-full max-w-xs mx-4 rounded-3xl px-7 py-8 flex flex-col gap-5"
            style={{ background: "#fffaf7", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-5 text-stone-400 text-xl leading-none"
            >
              ✕
            </button>
            <h3
              className="text-3xl text-center"
              style={{ fontFamily: "var(--font-mea), 'Mea Culpa', cursive", color: "#92593a" }}
            >
              RSVP
            </h3>
            <p
              className="text-sm text-center text-stone-400 -mt-3"
              style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif" }}
            >
              {showModal === "join" ? "We'd love to know you're coming" : "We're sorry you can't make it"}
            </p>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs tracking-wide text-stone-500 uppercase"
                style={{
                  fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl outline-none text-stone-700 text-sm"
                style={{
                  border: "1.5px solid #e0d6ce",
                  fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
                  background: "white",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs tracking-wide text-stone-500 uppercase"
                style={{
                  fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 000 0000"
                className="w-full px-4 py-3 rounded-xl outline-none text-stone-700 text-sm"
                style={{
                  border: "1.5px solid #e0d6ce",
                  fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
                  background: "white",
                }}
              />
            </div>
            {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}
            <button
              onClick={() => handleSubmit(showModal === "join")}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white text-base mt-1 disabled:opacity-60"
              style={{
                background: showModal === "join" ? "#92593a" : "#7a7065",
                fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
                letterSpacing: "0.05em",
              }}
            >
              {loading ? "Saving…" : showModal === "join" ? "Confirm Attendance" : "Confirm"}
            </button>
          </div>
        </div>
      )}

      <section
        ref={sectionRef}
        className="w-full bg-white px-8 pt-6 pb-16 flex flex-col items-center"
      >
        <h2
          className="text-5xl text-amber-800 mb-3"
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          Let's Celebrate
        </h2>
        <p
          className="text-base text-stone-500 mb-10 tracking-wide"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
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
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl"
            style={{
              background: "#92593a",
              color: "white",
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
            }}
          >
            <Image
              src="/icons/love.svg"
              alt=""
              width={22}
              height={22}
              className=""
            />
            I Will Join
          </button>
          <button
            onClick={() => { setName(""); setPhone(""); setError(""); setShowModal("decline"); }}
            className="w-full flex items-center justify-center py-4 rounded-2xl"
            style={{
              background: "white",
              color: "#57534e",
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
              border: "1.5px solid #d6cfc8",
            }}
          >
            Can't Make It
          </button>
        </div>
        {done && (
          <p
            className="mt-8 text-sm text-amber-700 text-center"
            style={{
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            }}
          >
            We're so excited to celebrate with you! 🤍
          </p>
        )}
      </section>
    </>
  );
}
