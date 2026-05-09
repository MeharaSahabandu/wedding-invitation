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
  const [formError, setFormError] = useState("");

  function handleContinue() {
    if (!name.trim() || !phone.trim()) {
      setFormError("Please fill in both fields.");
      return;
    }
    setFormError("");
    setStep("rsvp");
  }

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

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 40%, #450a0a 100%)" }}
    >
      {/* ── Popup modal (step: info) ── */}
      {step === "info" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            {/* Modal header */}
            <div
              className="px-7 py-5"
              style={{ background: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)" }}
            >
              <p className="text-white/70 text-xs tracking-widest uppercase mb-0.5">Wedding Invitation</p>
              <h2 className="text-white text-lg font-semibold">Prathibha &amp; Pathum</h2>
            </div>

            {/* Modal body */}
            <div className="px-7 py-6 space-y-4">
              <div>
                <p className="text-gray-800 font-medium text-sm mb-0.5">Enter your details to RSVP</p>
                <p className="text-gray-400 text-xs">We need your name and phone to record your response.</p>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  autoFocus
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="07X XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 bg-gray-50"
                />
              </div>

              {formError && <p className="text-red-500 text-xs">{formError}</p>}

              <button
                onClick={handleContinue}
                className="w-full rounded-full py-3.5 text-sm font-medium text-white transition-colors"
                style={{ background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)" }}
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 py-5 shrink-0">
        <div className="flex items-baseline gap-1">
          <span className="text-white font-black text-base tracking-wider">PANT</span>
          <span className="text-white text-base">★</span>
          <span className="text-white font-black text-base tracking-wider">RA</span>
          <span className="text-white/40 text-[9px] tracking-[0.25em] uppercase ml-2 self-center">
            Event Partners
          </span>
        </div>
        <div className="flex items-center gap-5 text-white/80 text-sm">
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Profile
          </button>
          <div className="w-px h-4 bg-white/25" />
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Greeting ── */}
      <div className="px-8 pt-2 pb-7 shrink-0">
        <h2 className="text-white text-2xl font-medium">
          {step === "info" ? "" : `Hi ${name}!`}
        </h2>
      </div>

      {/* ── Invitation card ── */}
      <div className="mx-6 mb-6 rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-1">

        {/* Left — event info */}
        <div className="flex-1 flex flex-col p-10" style={{ background: "#f9f9f9" }}>
          <h1
            className="font-bold text-gray-900 leading-tight mb-5"
            style={{ fontSize: "46px", letterSpacing: "-1px" }}
          >
            Our Wedding
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-lg">
            We joyfully invite you to celebrate the beginning of our new chapter. Join us for an
            exclusive evening that bridges love and togetherness. As the evening unfolds, experience
            timeless memories designed to complement this beautiful occasion.
          </p>

          <hr className="border-gray-200 mb-7" />

          {/* Date + Time row */}
          <div className="flex items-center gap-8 mb-4">
            <div className="flex items-center gap-2.5 text-gray-700">
              <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">04 June, 2026</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-700">
              <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">16.00 – 23.00</span>
            </div>
          </div>

          {/* Location row */}
          <div className="flex items-center gap-2.5 text-gray-700">
            <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">Grand Ballroom, Cinnamon Grand</span>
          </div>

          {/* Push to bottom */}
          <div className="mt-auto pt-10">
            {step === "rsvp" && (
              <>
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
              </>
            )}

            {step === "done" && (
              <div>
                <div className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium ${
                  attending
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {attending ? "✓ You confirmed attendance" : "✗ You declined"}
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  Thank you, {name}. We have recorded your response.
                </p>
              </div>
            )}

            {/* Placeholder buttons shown behind the modal */}
            {step === "info" && (
              <div className="flex gap-4 opacity-30 pointer-events-none select-none">
                <div className="px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-medium">
                  Confirm Participation
                </div>
                <div className="px-8 py-3.5 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
                  Not Attend
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Dashed divider ── */}
        <div
          className="hidden md:block shrink-0 self-stretch"
          style={{
            width: "1px",
            backgroundImage: "repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 8px, transparent 8px, transparent 18px)",
            margin: "24px 0",
          }}
        />

        {/* ── Right — poster ── */}
        <div
          className="hidden md:flex w-80 shrink-0 flex-col relative overflow-hidden"
          style={{ background: "linear-gradient(170deg, #991b1b 0%, #450a0a 55%, #1a0404 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute rounded-full border border-white/10"
            style={{ width: 240, height: 240, top: 20, right: -60 }} />
          <div className="absolute rounded-full border border-white/10"
            style={{ width: 160, height: 160, top: 60, right: -10 }} />
          <div className="absolute rounded-full border border-white/10"
            style={{ width: 80, height: 80, bottom: 100, left: 30 }} />

          {/* Dates top-right */}
          <div className="absolute top-7 right-6 text-right z-10">
            <p className="text-white/80 text-[11px] tracking-[0.2em] uppercase">June 04</p>
            <p className="text-white/30 text-xs my-0.5">—</p>
            <p className="text-white/80 text-[11px] tracking-[0.2em] uppercase">June 04</p>
            <p className="text-white/40 text-[10px] mt-1.5 tracking-wider">16 : 00 – 23 : 00</p>
          </div>

          {/* Big vertical text */}
          <div className="flex-1 flex items-end pl-6 pb-4 z-10">
            <p
              className="text-white font-black leading-none select-none"
              style={{
                fontSize: "70px",
                letterSpacing: "-4px",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                opacity: 0.9,
              }}
            >
              wedding
            </p>
          </div>

          {/* Bottom address */}
          <div className="p-6 z-10 border-t border-white/10">
            <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase leading-5">
              Grand Ballroom<br />
              Cinnamon Grand<br />
              Colombo, Sri Lanka
            </p>
            <p className="text-white/25 text-[9px] tracking-[0.2em] uppercase mt-3">
              We are waiting for you
            </p>
            <p className="text-white/20 text-[9px] tracking-wider mt-1">
              Prathibha &amp; Pathum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
