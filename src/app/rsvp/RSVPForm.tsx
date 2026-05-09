"use client";

import { useState } from "react";

type Step = "info" | "rsvp" | "done";

interface RSVPFormProps {
  /** URL of the event poster image shown in the right panel */
  posterSrc?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventDescription?: string;
}

export default function RSVPForm({
  posterSrc,
  eventTitle = "Our Wedding",
  eventDate = "04 June, 2026",
  eventTime = "16.00 – 23.00",
  eventLocation = "Grand Ballroom, Cinnamon Grand",
  eventDescription = "We joyfully invite you to celebrate the beginning of our new chapter. Join us for an exclusive evening that bridges love and togetherness. As the evening unfolds, experience timeless memories designed to complement this beautiful occasion.",
}: RSVPFormProps) {
  const [step, setStep] = useState<Step>("info");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        attending: choice,
      }),
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
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(to bottom, #c41a1a 0%, #7f1d1d 30%, #3b0a0a 50%, #ffffff 50%, #ffffff 100%)",
      }}
    >
      {/* ── Info modal ── */}
      {step === "info" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div
              className="px-7 py-5"
              style={{
                background: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)",
              }}
            >
              <p className="text-white/70 text-xs tracking-widest uppercase mb-0.5">
                Wedding Invitation
              </p>
              <h2 className="text-white text-lg font-semibold">
                Prathibha &amp; Pathum
              </h2>
            </div>
            <div className="px-7 py-6 space-y-4">
              <div>
                <p className="text-gray-800 font-medium text-sm mb-0.5">
                  Enter your details to RSVP
                </p>
                <p className="text-gray-400 text-xs">
                  We need your name and phone to record your response.
                </p>
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
                className="w-full rounded-full py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 pt-6 pb-2 shrink-0">
        {/* Logo — stacked vertically like the screenshot */}
        <div className="flex flex-col leading-none">
          <span className="text-white font-black text-xl tracking-widest">
            PANT<span className="font-light mx-0.5">★</span>RA
          </span>
          <span className="text-white/50 text-[9px] tracking-[0.35em] uppercase mt-1">
            Event Partners
          </span>
        </div>

        {/* Nav — icon + label | icon + label */}
        <div className="flex items-center text-white/85 text-sm">
          <button className="flex items-center gap-2 hover:text-white transition-colors px-3 py-1">
            {/* Circle-person icon */}
            <svg
              className="w-[18px] h-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="9" r="3" />
              <path
                strokeLinecap="round"
                d="M6.168 18.849A4.008 4.008 0 0110 16h4a4.008 4.008 0 013.832 2.849"
              />
            </svg>
            Profile
          </button>

          <span className="text-white/35 select-none text-base mx-0.5">|</span>

          <button className="flex items-center gap-2 hover:text-white transition-colors px-3 py-1">
            {/* Arrow-right-from-bracket icon */}
            <svg
              className="w-[18px] h-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Greeting ── */}
      <div className="px-8 pt-7 pb-8 shrink-0">
        <h2 className="text-white text-2xl font-semibold tracking-tight">
          {step === "info" ? "\u00A0" : `Hi ${name}!`}
        </h2>
      </div>

      {/* ── Main card ── */}
      <div className="px-6 mb-6">
        <div
          className="mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden flex"
          style={{ minHeight: "530px", maxWidth: "860px" }}
        >
          {/* Left — event info */}
          <div
            className="flex-1 flex flex-col px-12 py-10"
            style={{
              backgroundColor: "#f7f7f7",
              backgroundImage:
                "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            <h1
              className="font-bold text-gray-900 leading-none mb-6"
              style={{ fontSize: "48px", letterSpacing: "-1.5px" }}
            >
              {eventTitle}
            </h1>

            <p
              className="text-gray-400 text-sm leading-relaxed mb-8"
              style={{ maxWidth: "480px" }}
            >
              {eventDescription}
            </p>

            <hr className="border-gray-200 mb-8" />

            {/* Date + Time row */}
            <div className="flex items-center gap-10 mb-5">
              <div className="flex items-center gap-2.5 text-gray-700">
                {/* Calendar icon */}
                <svg
                  className="w-5 h-5 text-gray-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="text-sm">{eventDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-700">
                {/* Clock icon */}
                <svg
                  className="w-5 h-5 text-gray-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 7v5l3 3" />
                </svg>
                <span className="text-sm">{eventTime}</span>
              </div>
            </div>

            {/* Location row */}
            <div className="flex items-center gap-2.5 text-gray-700">
              {/* Pin icon */}
              <svg
                className="w-5 h-5 text-gray-500 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
                />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span className="text-sm">{eventLocation}</span>
            </div>

            {/* Buttons — pushed to bottom */}
            <div className="mt-auto pt-12">
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
                      className="px-8 py-3.5 rounded-full bg-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                      {loading ? "Saving…" : "Not Attend"}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-3">{error}</p>
                  )}
                </>
              )}

              {step === "done" && (
                <div>
                  <div
                    className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium ${
                      attending
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {attending
                      ? "✓ You confirmed attendance"
                      : "✗ You declined"}
                  </div>
                  <p className="text-gray-400 text-xs mt-3">
                    Thank you, {name}. We have recorded your response.
                  </p>
                </div>
              )}

              {step === "info" && (
                <div className="flex gap-4 opacity-25 pointer-events-none select-none">
                  <div className="px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-medium">
                    Confirm Participation
                  </div>
                  <div className="px-8 py-3.5 rounded-full bg-gray-200 text-gray-500 text-sm font-medium">
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
              backgroundImage:
                "repeating-linear-gradient(to bottom, #c8c8c8 0px, #c8c8c8 6px, transparent 6px, transparent 16px)",
              margin: "28px 0",
            }}
          />

          {/* ── Right — poster image panel ── */}
          <div
            className="hidden md:flex w-[370px] shrink-0 items-stretch justify-center p-5"
            style={{ backgroundColor: "#efefef" }}
          >
            {posterSrc ? (
              <img
                src={posterSrc}
                alt="Event poster"
                className="w-full object-cover rounded-xl shadow-md"
              />
            ) : (
              /* Fallback CSS poster when no image is provided */
              <div
                className="w-full rounded-xl overflow-hidden relative flex flex-col shadow-md"
                style={{
                  background:
                    "linear-gradient(170deg, #991b1b 0%, #450a0a 55%, #1a0404 100%)",
                }}
              >
                <div
                  className="absolute rounded-full border border-white/10"
                  style={{ width: 220, height: 220, top: 16, right: -50 }}
                />
                <div
                  className="absolute rounded-full border border-white/10"
                  style={{ width: 140, height: 140, top: 52, right: 0 }}
                />
                <div
                  className="absolute rounded-full border border-white/10"
                  style={{ width: 70, height: 70, bottom: 90, left: 24 }}
                />

                <div className="absolute top-6 right-5 text-right z-10">
                  <p className="text-white/80 text-[10px] tracking-[0.2em] uppercase">
                    June 04
                  </p>
                  <p className="text-white/30 text-xs my-0.5">—</p>
                  <p className="text-white/80 text-[10px] tracking-[0.2em] uppercase">
                    June 04
                  </p>
                  <p className="text-white/40 text-[9px] mt-1 tracking-wider">
                    16 : 00 – 23 : 00
                  </p>
                </div>

                <div className="flex-1 flex items-end pl-5 pb-3 z-10">
                  <p
                    className="text-white font-black leading-none select-none"
                    style={{
                      fontSize: "64px",
                      letterSpacing: "-4px",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      opacity: 0.9,
                    }}
                  >
                    wedding
                  </p>
                </div>

                <div className="p-5 z-10 border-t border-white/10">
                  <p className="text-white/40 text-[8px] tracking-[0.2em] uppercase leading-5">
                    Grand Ballroom
                    <br />
                    Cinnamon Grand
                    <br />
                    Colombo, Sri Lanka
                  </p>
                  <p className="text-white/25 text-[8px] tracking-[0.2em] uppercase mt-2">
                    We are waiting for you
                  </p>
                  <p className="text-white/20 text-[8px] tracking-wider mt-1">
                    Prathibha &amp; Pathum
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
