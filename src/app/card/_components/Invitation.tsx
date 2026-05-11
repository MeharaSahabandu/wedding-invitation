"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";

export default function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: "clamp(520px, 100dvh, 780px)", background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes butterflyFly1 {
          0%   { transform: translate(0px, 0px) rotate(0deg) scaleX(1); }
          25%  { transform: translate(35px, -30px) rotate(10deg) scaleX(-1); }
          50%  { transform: translate(70px, -10px) rotate(-8deg) scaleX(1); }
          75%  { transform: translate(40px, -45px) rotate(12deg) scaleX(-1); }
          100% { transform: translate(0px, 0px) rotate(0deg) scaleX(1); }
        }
        @keyframes butterflyFly2 {
          0%   { transform: translate(0px, 0px) scaleX(1); }
          30%  { transform: translate(-30px, -40px) scaleX(-1); }
          60%  { transform: translate(-55px, -15px) scaleX(1); }
          100% { transform: translate(0px, 0px) scaleX(1); }
        }
      `}</style>

      {/* Top dark fade */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{
        height: "200px",
        background: "linear-gradient(to bottom, #0d0d0d 20%, rgba(13,13,13,0.6) 70%, transparent 100%)",
      }} />

      {/* Bottom dark fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{
        height: "220px",
        background: "linear-gradient(to top, #0d0d0d 20%, rgba(13,13,13,0.8) 60%, transparent 100%)",
      }} />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/garden.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.22 }}
        />
        {/* Butterflies */}
        {[
          { top: "55%", left: "12%", anim: "butterflyFly1", dur: "7s",  delay: "0s" },
          { top: "62%", left: "68%", anim: "butterflyFly2", dur: "9s",  delay: "1.5s" },
          { top: "70%", left: "35%", anim: "butterflyFly1", dur: "8s",  delay: "0.8s" },
          { top: "58%", left: "52%", anim: "butterflyFly2", dur: "10s", delay: "2.5s" },
          { top: "75%", left: "78%", anim: "butterflyFly1", dur: "7s",  delay: "3.2s" },
        ].map((b, i) => (
          <span key={i} style={{
            position: "absolute",
            top: b.top,
            left: b.left,
            fontSize: 10,
            pointerEvents: "none",
            userSelect: "none",
            animation: `${b.anim} ${b.dur} ease-in-out ${b.delay} infinite`,
            display: "inline-block",
            opacity: 0.45,
            filter: "sepia(1) saturate(1.5) hue-rotate(5deg) brightness(1.2)",
          }}>🦋</span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-8 py-16 text-center w-full"
        style={{ maxWidth: "min(420px, 100vw)" }}>

        {/* "our" in script */}
        <p style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(2rem, 9vw, 2.8rem)",
          color: GOLD,
          lineHeight: 1,
          marginBottom: "0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}>
          our
        </p>

        {/* "LOVE STORY" in Cinzel */}
        <h2 style={{
          fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
          fontSize: "clamp(1.6rem, 8vw, 2.2rem)",
          color: "#f0ebe0",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: "normal",
          marginTop: "0",
          marginBottom: "1.8rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease 0.1s, transform 1.1s ease 0.1s",
        }}>
          Love Story
        </h2>

        {/* Gold rule */}
        <div style={{
          width: "3rem",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginBottom: "2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.1s ease 0.2s",
        }} />

        {/* Heart icon */}
        <div className="mb-6" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.1s ease 0.25s, transform 1.1s ease 0.25s",
        }}>
          <Image
            src="/icons/heart.svg"
            alt=""
            width={56}
            height={24}
            style={{ filter: "invert(78%) sepia(28%) saturate(500%) hue-rotate(5deg) brightness(95%)", opacity: 0.8 }}
          />
        </div>

        {/* Invitation text */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
          fontSize: "clamp(0.85rem, 3.8vw, 1rem)",
          color: "#9a9080",
          lineHeight: 2,
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease 0.35s, transform 1.2s ease 0.35s",
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
