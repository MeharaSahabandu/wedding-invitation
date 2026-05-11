"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";

export default function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: "100dvh", background: "#0d0d0d" }}
    >
      {/* Top dark fade */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{
        height: "220px",
        background: "linear-gradient(to bottom, #0d0d0d 30%, rgba(13,13,13,0.5) 70%, transparent 100%)",
      }} />

      {/* Bottom dark fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{
        height: "240px",
        background: "linear-gradient(to top, #0d0d0d 30%, rgba(13,13,13,0.7) 60%, transparent 100%)",
      }} />

      {/* Background photo — replace /images/couple.jpg with your own photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.55 }}
          onError={(e) => {
            // Fallback to garden if couple.jpg not yet added
            (e.target as HTMLImageElement).src = "/images/garden.png";
            (e.target as HTMLImageElement).style.opacity = "0.22";
          }}
        />
        {/* Dark vignette over photo */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(13,13,13,0.7) 80%)",
        }} />
      </div>

      <style>{`
        @keyframes ourDrift {
          0%   { opacity: 0; transform: translateY(-28px) scale(0.85); letter-spacing: 0.4em; }
          60%  { letter-spacing: 0.05em; }
          100% { opacity: 1; transform: translateY(0) scale(1); letter-spacing: 0.05em; }
        }
        @keyframes wipeUp {
          from { clip-path: inset(100% 0 0 0); }
          to   { clip-path: inset(0% 0 0 0); }
        }
        @keyframes drawUnderline {
          from { width: 0; opacity: 0; }
          to   { width: 3.5rem; opacity: 1; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-8 py-16 text-center w-full"
        style={{ maxWidth: "min(420px, 100vw)" }}>

        {/* "our" — drifts down from above, letters expand into place */}
        <p style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(2.2rem, 10vw, 3rem)",
          color: GOLD,
          lineHeight: 1,
          marginBottom: 0,
          opacity: visible ? undefined : 0,
          animation: visible ? "ourDrift 1s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
        }}>
          our
        </p>

        {/* "LOVE STORY" — wipe-up reveal */}
        <div style={{ overflow: "hidden", marginTop: 0, marginBottom: "0.5rem" }}>
          <h2 style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(1.8rem, 9vw, 2.4rem)",
            color: CREAM,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: "normal",
            margin: 0,
            clipPath: visible ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            animation: visible ? "wipeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s both" : "none",
          }}>
            Love Story
          </h2>
        </div>

        {/* Gold underline draws itself left→right */}
        <div style={{
          height: "1px",
          background: GOLD,
          marginBottom: "2rem",
          width: visible ? undefined : 0,
          animation: visible ? "drawUnderline 0.7s ease 0.9s both" : "none",
        }} />

        {/* Invitation text */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
          fontSize: "clamp(0.85rem, 3.8vw, 1rem)",
          color: "rgba(240,235,224,0.75)",
          lineHeight: 2,
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
        }}>
          As we prepare to walk hand-in-hand into a new chapter of our lives, we
          find our greatest joy is in the people who have walked beside us along
          the way. Your love and friendship have shaped our story, and it would
          mean the world to us to have you there as we exchange our vows. Please
          join us for a day of laughter, love, and a celebration of the beautiful
          journey ahead.
        </p>
      </div>
    </section>
  );
}
