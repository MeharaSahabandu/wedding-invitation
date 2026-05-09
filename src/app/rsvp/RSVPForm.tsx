"use client";

import { useState } from "react";

type Step = "info" | "rsvp" | "done";

export default function RSVPForm() {
  const [step, setStep]           = useState<Step>("info");
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  async function submitRSVP(choice: boolean) {
    setLoading(true);
    setError("");
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), attending: choice }),
    });
    if (res.status === 409) {
      setError("This phone number has already been used to RSVP.");
      setLoading(false);
      return;
    }
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    setAttending(choice);
    setStep("done");
    setLoading(false);
  }

  function handleContinue() {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setStep("rsvp");
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 40%, #450a0a 100%)" }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 py-5 shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-white font-black text-sm tracking-wider">PANT</span>
          <span className="text-white text-sm">★</span>
          <span className="text-white font-black text-sm tracking-wider">RA</span>
          <div className="ml-2">
            <p className="text-white/50 text-[9px] tracking-[0.2em] uppercase leading-none">Event Partners</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white/80 text-sm">
          <button className="flex items-center gap-2 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Profile
          </button>
          <div className="w-px h-5 bg-white/20" />
          <button className="flex items-center gap-2 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Greeting ── */}
      <div className="px-8 pt-4 pb-6 shrink-0">
        {step === "info" ? (
          <h2 className="text-white text-2xl font-medium">Welcome! Please enter your details.</h2>
        ) : (
          <h2 className="text-white text-2xl font-medium">Hi {name}!</h2>
        )}
      </div>

      {/* ── Card ── */}
      <div className="mx-6 mb-6 rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-1">

        {/* Left — content */}
        <div className="flex-1 flex flex-col p-10" style={{ background: "#fafafa" }}>

          {/* Title */}
          <h1 className="font-bold text-gray-900 mb-5 leading-tight" style={{ fontSize: "42px" }}>
            {step === "info" ? "Our Wedding" : "Our Wedding"}
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">
            We joyfully invite you to celebrate the beginning of our new chapter.
            Join us for an exclusive evening of love, laughter, and timeless
            memories as we unite together in marriage.
          </p>

          <hr className="border-gray-200 mb-6" />

          {/* Date / Time / Location */}
          <div className="space-y-4 mb-2">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5 text-gray-700">
                <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">04 June, 2026</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-700">
                <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">16.00 – 23.00</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-gray-700">
              <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Grand Ballroom, Cinnamon Grand</span>
            </div>
          </div>

          {/* Push buttons/form to bottom */}
          <div className="mt-auto pt-10">

            {/* STEP 1 — enter name + phone */}
            {step === "info" && (
              <div className="space-y-3 max-w-sm">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                />
                <input
                  type="tel"
                  placeholder="Phone number (07X XXX XXXX)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button
                  onClick={handleContinue}
                  className="px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 — RSVP buttons */}
            {step === "rsvp" && (
              <div>
                <div className="flex gap-4">
                  <button
                    onClick={() => submitRSVP(true)}
                    disabled={loading}
                    className="px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Saving…" : "Confirm Participation"}
                  </button>
                  <button
                    onClick={() => submitRSVP(false)}
                    disabled={loading}
                    className="px-8 py-3.5 rounded-full bg-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-300 disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Saving…" : "Not Attend"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
                <button
                  onClick={() => { setStep("info"); setError(""); }}
                  className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline block"
                >
                  ← Change details
                </button>
              </div>
            )}

            {/* STEP 3 — done */}
            {step === "done" && (
              <div>
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium ${
                    attending
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {attending ? "✓ You confirmed attendance" : "✗ You declined"}
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  Thank you, {name}. We have recorded your response.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Dashed divider ── */}
        <div
          className="hidden md:block shrink-0"
          style={{
            width: "1px",
            background: "repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 8px, transparent 8px, transparent 16px)",
            margin: "24px 0",
          }}
        />

        {/* ── Right — poster ── */}
        <div
          className="hidden md:flex w-80 shrink-0 flex-col relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #991b1b 0%, #450a0a 60%, #1c0404 100%)" }}
        >
          {/* Decorative circles */}
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: 220, height: 220, top: 30, right: -40 }}
          />
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: 140, height: 140, top: 80, right: 10 }}
          />
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: 100, height: 100, bottom: 80, left: 20 }}
          />

          {/* Date top-right */}
          <div className="absolute top-8 right-6 text-right z-10">
            <p className="text-white/70 text-xs tracking-widest uppercase font-light">June 04</p>
            <p className="text-white/30 text-xs">—</p>
            <p className="text-white/70 text-xs tracking-widest uppercase font-light">June 04</p>
            <p className="text-white/40 text-[10px] mt-1">16 : 00 – 23 : 00</p>
          </div>

          {/* Big vertical text */}
          <div className="flex-1 flex items-end p-6 z-10">
            <div>
              <p
                className="text-white font-black leading-none"
                style={{ fontSize: "64px", letterSpacing: "-3px", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
              >
                wedding
              </p>
            </div>
            <div className="ml-3 self-end pb-1">
              <p className="text-white/20 text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>
                2026
              </p>
            </div>
          </div>

          {/* Bottom info */}
          <div className="p-6 z-10 border-t border-white/10">
            <p className="text-white/30 text-[9px] tracking-widest uppercase leading-relaxed">
              Grand Ballroom<br />Cinnamon Grand<br />Colombo
            </p>
            <p className="text-white/20 text-[9px] tracking-widest uppercase mt-2">
              We are waiting for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
