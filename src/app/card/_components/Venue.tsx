"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";

export default function Venue() {
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

      {/* Background venue photo — replace /images/venue.jpg with your venue photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/venue.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.5 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/card-bg.png";
            (e.target as HTMLImageElement).style.opacity = "0.18";
          }}
        />
        {/* Dark vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(13,13,13,0.65) 80%)",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-8 py-16 text-center w-full"
        style={{ maxWidth: "min(420px, 100vw)" }}>

        {/* Gold rule */}
        <div style={{
          width: "5rem",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginBottom: "2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.1s ease",
        }} />

        {/* "the" script */}
        <p style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(2.2rem, 10vw, 3rem)",
          color: GOLD,
          lineHeight: 1,
          marginBottom: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease 0.1s, transform 1.1s ease 0.1s",
        }}>
          the
        </p>

        {/* "VENUE" */}
        <h2 style={{
          fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
          fontSize: "clamp(1.8rem, 9vw, 2.5rem)",
          color: CREAM,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: "normal",
          marginTop: 0,
          marginBottom: "2rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease 0.15s, transform 1.1s ease 0.15s",
        }}>
          Venue
        </h2>

        {/* Venue name */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
          fontSize: "clamp(1rem, 4.5vw, 1.3rem)",
          letterSpacing: "0.18em",
          color: GOLD,
          textTransform: "uppercase",
          marginBottom: "1rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease 0.25s, transform 1.1s ease 0.25s",
        }}>
          Vinrich Lake Resort
        </p>

        {/* Gold rule */}
        <div style={{
          width: "3rem",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginBottom: "1.2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.1s ease 0.3s",
        }} />

        {/* Address */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "1.6rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.1s ease 0.35s, transform 1.1s ease 0.35s",
        }}>
          <span style={{ color: GOLD, fontSize: "0.8rem", marginTop: "1px" }}>📍</span>
          <p style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "#8a8070",
            textTransform: "uppercase",
            lineHeight: 2,
            textAlign: "left",
          }}>
            Riverbank Chateau Hall<br />
            Piliyandala
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.82rem",
          color: "rgba(240,235,224,0.5)",
          lineHeight: 1.9,
          fontStyle: "italic",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.2s ease 0.45s, transform 1.2s ease 0.45s",
        }}>
          Elegant luxury venue nestled alongside<br />
          the lake. Limited availability — book early.
        </p>

        {/* Gold rule */}
        <div style={{
          width: "5rem",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginTop: "2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.1s ease 0.55s",
        }} />
      </div>
    </section>
  );
}
