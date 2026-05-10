"use client";

import Image from "next/image";
import { useState } from "react";

export default function RSVP() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), attending: true }),
    });
    setLoading(false);
    if (!res.ok) { setError("Something went wrong. Please try again."); return; }
    setShowModal(false);
    setDone(true);
  }

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.35)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-xs mx-4 rounded-3xl px-7 py-8 flex flex-col gap-5"
            style={{ background: "#fffaf7", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-5 text-stone-400 text-xl leading-none">✕</button>
            <h3 className="text-3xl text-center" style={{ fontFamily: "var(--font-mea), 'Mea Culpa', cursive", color: "#92593a" }}>RSVP</h3>
            <p className="text-sm text-center text-stone-400 -mt-3" style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif" }}>We'd love to know you're coming</p>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-stone-500 uppercase" style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif" }}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl outline-none text-stone-700 text-sm"
                style={{ border: "1.5px solid #e0d6ce", fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", background: "white" }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-stone-500 uppercase" style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif" }}>Phone Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 77 000 0000"
                className="w-full px-4 py-3 rounded-xl outline-none text-stone-700 text-sm"
                style={{ border: "1.5px solid #e0d6ce", fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", background: "white" }} />
            </div>
            {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}
            <button onClick={handleConfirm} disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white text-base mt-1 disabled:opacity-60"
              style={{ background: "#92593a", fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", letterSpacing: "0.05em" }}>
              {loading ? "Saving…" : "Confirm Attendance"}
            </button>
          </div>
        </div>
      )}

      <section className="w-full bg-white px-8 py-16 flex flex-col items-center">
        <h2 className="text-5xl text-amber-800 mb-3" style={{ fontFamily: "var(--font-mea), 'Mea Culpa', cursive" }}>Let's Celebrate</h2>
        <p className="text-base text-stone-500 mb-10 tracking-wide" style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif" }}>Please Confirm your Participation</p>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <button onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl"
            style={{ background: "#92593a", color: "white", fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}>
            <Image src="/icons/love.svg" alt="" width={22} height={22} className="invert" />
            I Will Join
          </button>
          <button onClick={async () => {
            if (name && phone) {
              await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, attending: false }) });
            }
          }}
            className="w-full flex items-center justify-center py-4 rounded-2xl"
            style={{ background: "white", color: "#57534e", fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif", fontSize: "1.1rem", letterSpacing: "0.05em", border: "1.5px solid #d6cfc8" }}>
            Not Sure
          </button>
        </div>
        {done && (
          <p className="mt-8 text-sm text-amber-700 text-center" style={{ fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif" }}>
            We're so excited to celebrate with you! 🤍
          </p>
        )}
      </section>
    </>
  );
}
