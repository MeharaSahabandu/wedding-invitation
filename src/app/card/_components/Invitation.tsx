"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";

const WORDS =
  "As we prepare to walk hand-in-hand into a new chapter of our lives, we find our greatest joy is in the people who have walked beside us along the way. Your love and friendship have shaped our story, and it would mean the world to us to have you there as we exchange our vows. Please join us for a day of laughter, love, and a celebration of the beautiful journey ahead."
    .split(" ");

export default function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [depth, setDepth] = useState({ rx: 0, tz: 0 });

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onScroll() {
      if (window.innerWidth < 768) return;
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      setDepth({ rx: progress * 10, tz: Math.abs(progress) * -90 });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes swingFromLeft {
          0%   { opacity: 0; transform: perspective(900px) rotateY(-60deg) translateX(-60px); filter: blur(6px); }
          50%  { opacity: 1; filter: blur(0px); }
          100% { opacity: 1; transform: perspective(900px) rotateY(0deg) translateX(0); filter: blur(0); }
        }

        @keyframes riseFromDepth {
          0%   { opacity: 0; transform: perspective(800px) rotateX(70deg) translateY(60px); filter: blur(5px); }
          50%  { opacity: 1; filter: blur(0px); }
          100% { opacity: 1; transform: perspective(800px) rotateX(0deg) translateY(0); filter: blur(0); }
        }

        @keyframes stretchOpen {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        @keyframes goldPulse {
          0%,100% { opacity: 1; box-shadow: 0 0 0 rgba(201,169,110,0); }
          50%     { opacity: 0.85; box-shadow: 0 0 18px rgba(201,169,110,0.35); }
        }

        @keyframes slideUp {
          0%   { transform: translateY(110%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Top dark fade */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{
        height: "80px",
        background: "linear-gradient(to bottom, #0d0d0d 20%, transparent 100%)",
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
          style={{ opacity: 0.28 }}
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
      <div className="relative z-20 flex flex-col items-center px-8 pt-6 pb-8 text-center w-full"
        style={{
          maxWidth: "min(420px, 100vw)",
          transform: `perspective(1100px) rotateX(${depth.rx}deg) translateZ(${depth.tz}px)`,
          willChange: "transform",
        }}>

        {/* "written in" */}
        <p style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(2.2rem, 10vw, 3rem)",
          color: GOLD,
          lineHeight: 1,
          marginBottom: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0) rotateY(0deg)" : "translateX(-60px) rotateY(-40deg)",
          transition: "opacity 1.4s ease 0.2s, transform 1.4s ease 0.2s",
        }}>
          written in
        </p>

        {/* "The Stars" */}
        <h2 style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "clamp(2.2rem, 11vw, 3rem)",
          color: CREAM,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: "300",
          marginTop: 0,
          marginBottom: "0.6rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(50px) rotateX(50deg)",
          transition: "opacity 1.4s ease 0.5s, transform 1.4s ease 0.5s",
        }}>
          The Stars
        </h2>

        {/* Gold line */}
        <div style={{
          height: "1px",
          width: "3.5rem",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginBottom: "2.2rem",
          transformOrigin: "center",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          opacity: visible ? 1 : 0,
          transition: "transform 1.2s ease 1.2s, opacity 1.2s ease 1.2s",
        }} />

        {/* Paragraph */}
        <div style={{ overflow: "hidden" }}>
          <p style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "clamp(0.85rem, 3.8vw, 1rem)",
            color: "rgba(240,235,224,0.72)",
            lineHeight: 2,
            textAlign: "center",
            margin: 0,
            animation: visible ? "slideUp 1.6s cubic-bezier(0.16,1,0.3,1) 1.6s both" : "none",
            opacity: visible ? undefined : 0,
          }}>
            {WORDS.join(" ")}
          </p>
        </div>

      </div>
    </section>
  );
}
