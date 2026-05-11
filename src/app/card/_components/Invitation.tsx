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
      <style>{`
        /* "our" — swings in from far left diagonal, slowly */
        @keyframes swingFromLeft {
          0%   { opacity: 0; transform: translateX(-140px) translateY(-60px) rotate(-18deg); filter: blur(6px); }
          55%  { opacity: 1; filter: blur(0px); }
          80%  { transform: translateX(6px) translateY(2px) rotate(1deg); }
          100% { opacity: 1; transform: translateX(0) translateY(0) rotate(0deg); filter: blur(0); }
        }

        /* "Love Story" — rises slowly from well below, with a 3-D perspective tilt */
        @keyframes riseFromDepth {
          0%   { opacity: 0; transform: perspective(700px) rotateX(72deg) translateY(80px); filter: blur(4px); }
          50%  { opacity: 0.8; filter: blur(0px); }
          80%  { transform: perspective(700px) rotateX(-4deg) translateY(-4px); }
          100% { opacity: 1; transform: perspective(700px) rotateX(0deg) translateY(0); filter: blur(0); }
        }

        /* Gold line stretches open from center outward */
        @keyframes stretchOpen {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        /* Paragraph drifts up very slowly */
        @keyframes slowDriftUp {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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

      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple2.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.55 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/garden.png";
            (e.target as HTMLImageElement).style.opacity = "0.22";
          }}
        />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(13,13,13,0.7) 80%)",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-8 py-16 text-center w-full"
        style={{ maxWidth: "min(420px, 100vw)" }}>

        {/* "our" — swings in from upper-left, slow */}
        <p style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(2.2rem, 10vw, 3rem)",
          color: GOLD,
          lineHeight: 1,
          marginBottom: 0,
          opacity: visible ? undefined : 0,
          animation: visible
            ? "swingFromLeft 2.2s cubic-bezier(0.16,1,0.3,1) 0.1s both"
            : "none",
        }}>
          our
        </p>

        {/* "Love Story" — rises slowly from below with 3-D tilt */}
        <h2 style={{
          fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
          fontSize: "clamp(1.8rem, 9vw, 2.4rem)",
          color: CREAM,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: "normal",
          marginTop: 0,
          marginBottom: "0.6rem",
          opacity: visible ? undefined : 0,
          transformOrigin: "center bottom",
          animation: visible
            ? "riseFromDepth 2.4s cubic-bezier(0.16,1,0.3,1) 0.5s both"
            : "none",
        }}>
          Love Story
        </h2>

        {/* Gold line stretches open from center */}
        <div style={{
          height: "1px",
          width: "3.5rem",
          background: GOLD,
          marginBottom: "2.2rem",
          transformOrigin: "center",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          opacity: visible ? 1 : 0,
          transition: visible
            ? "transform 1.6s cubic-bezier(0.16,1,0.3,1) 1.6s, opacity 1s ease 1.6s"
            : "none",
        }} />

        {/* Invitation text — slow drift up */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
          fontSize: "clamp(0.85rem, 3.8vw, 1rem)",
          color: "rgba(240,235,224,0.75)",
          lineHeight: 2,
          textAlign: "center",
          opacity: visible ? undefined : 0,
          animation: visible
            ? "slowDriftUp 2s ease 1.2s both"
            : "none",
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
