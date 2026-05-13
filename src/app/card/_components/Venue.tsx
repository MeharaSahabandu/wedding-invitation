"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";

export default function Venue() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [depth, setDepth] = useState({ rx: 0, tz: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onScroll() {
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
        @keyframes venueDrop {
          0%   { opacity: 0; transform: perspective(900px) rotateX(70deg) translateY(40px); filter: blur(6px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(900px) rotateX(0deg) translateY(0); }
        }
        @keyframes venueNameReveal {
          0%   { opacity: 0; transform: perspective(700px) rotateX(50deg) translateY(25px); filter: blur(3px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(700px) rotateX(0deg) translateY(0); }
        }
        @keyframes venueGlow {
          0%,100% { text-shadow: 0 0 0 rgba(201,169,110,0); }
          50%     { text-shadow: 0 0 20px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.15); }
        }
        @keyframes ruleGlow {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; box-shadow: 0 0 12px rgba(201,169,110,0.5); }
        }
      `}</style>
      {/* Top dark fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: "220px",
          background:
            "linear-gradient(to bottom, #0d0d0d 30%, rgba(13,13,13,0.5) 70%, transparent 100%)",
        }}
      />

      {/* Bottom dark fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "240px",
          background:
            "linear-gradient(to top, #0d0d0d 30%, rgba(13,13,13,0.7) 60%, transparent 100%)",
        }}
      />

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
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(13,13,13,0.65) 80%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center px-8 py-16 text-center w-full"
        style={{
          maxWidth: "min(420px, 100vw)",
          transform: `perspective(1100px) rotateX(${depth.rx}deg) translateZ(${depth.tz}px)`,
          willChange: "transform",
        }}
      >
        {/* Gold rule */}
        <div
          style={{
            width: "5rem",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        />

        {/* "the" script */}
        <p
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.2rem, 10vw, 3rem)",
            color: GOLD,
            lineHeight: 1,
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            animation: visible ? "venueDrop 2.2s cubic-bezier(0.16,1,0.3,1) 0.1s both" : "none",
          }}
        >
          the
        </p>

        {/* "VENUE" */}
        <h2
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(1.8rem, 9vw, 2.5rem)",
            color: CREAM,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: "normal",
            marginTop: 0,
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            animation: visible ? "venueDrop 2.2s cubic-bezier(0.16,1,0.3,1) 0.35s both" : "none",
          }}
        >
          Venue
        </h2>

        {/* Venue name */}
        <p
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "clamp(1rem, 4.5vw, 1.3rem)",
            letterSpacing: "0.18em",
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: "1rem",
            opacity: visible ? 1 : 0,
            animation: visible
              ? "venueNameReveal 2.2s cubic-bezier(0.16,1,0.3,1) 0.6s both, venueGlow 3s ease-in-out 3.5s infinite"
              : "none",
          }}
        >
          Vinrich Lake Resort
        </p>

        {/* Gold rule */}

        {/* Address */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "1.6rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.6s ease 0.9s, transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.9s",
          }}
        >
          <span style={{ color: GOLD, fontSize: "0.8rem", marginTop: "1px" }}>
            📍
          </span>
          <p
            style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: "#8a8070",
              textTransform: "uppercase",
              lineHeight: 2,
              textAlign: "left",
            }}
          >
            Riverbank Chateau Hall
            <br />
            Piliyandala
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.82rem",
            color: "rgba(240,235,224,0.5)",
            lineHeight: 1.9,
            fontStyle: "italic",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease 0.45s, transform 1.2s ease 0.45s",
          }}
        ></p>

        {/* Gold rule */}
        <div
          style={{
            width: "5rem",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            marginTop: "2rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.1s ease 0.55s",
          }}
        />
      </div>
    </section>
  );
}
