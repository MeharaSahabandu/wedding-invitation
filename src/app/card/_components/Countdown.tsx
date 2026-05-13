"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

const WEDDING = new Date("2026-06-04T16:00:00+05:30").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = WEDDING - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [depth, setDepth] = useState({ rx: 0, tz: 0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

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

  const units = [
    { label: "Days", value: pad(time.days) },
    { label: "Hours", value: pad(time.hours) },
    { label: "Minutes", value: pad(time.minutes) },
    { label: "Seconds", value: pad(time.seconds) },
  ];

  return (
    <section
      ref={ref}
      className="w-full pt-8 pb-12 px-6 flex flex-col items-center"
      style={{ background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes flipDown {
          0%   { transform: perspective(600px) rotateX(-100deg) translateY(-30px) scale(0.8); opacity: 0; filter: blur(2px); }
          55%  { opacity: 1; filter: blur(0); }
          80%  { transform: perspective(600px) rotateX(8deg) translateY(2px) scale(1.02); }
          100% { transform: perspective(600px) rotateX(0deg) translateY(0) scale(1); opacity: 1; }
        }
        @keyframes headingSwing {
          0%   { opacity: 0; transform: perspective(900px) rotateX(60deg) translateY(-30px); filter: blur(4px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(900px) rotateX(0deg) translateY(0); }
        }
        @keyframes unitRise {
          0%   { opacity: 0; transform: perspective(700px) rotateY(-50deg) translateX(-30px); filter: blur(3px); }
          50%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: perspective(700px) rotateY(0deg) translateX(0); }
        }
        @keyframes cardGlow {
          0%,100% { border-color: rgba(201,169,110,0.15); box-shadow: 0 0 0 rgba(201,169,110,0); }
          50%     { border-color: rgba(201,169,110,0.4); box-shadow: 0 0 18px rgba(201,169,110,0.18); }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `perspective(1100px) rotateX(${depth.rx}deg) translateZ(${depth.tz}px)`,
          willChange: "transform",
        }}
      >
        {/* Contact */}
        <div
          style={{
            marginBottom: "1.5rem",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.1s",
          }}
        >
          <a
            href="tel:+94768802041"
            style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.9rem",
              letterSpacing: "0.18em",
              color: GOLD,
              textDecoration: "none",
              display: "block",
            }}
          >
            +94 76 880 2041
          </a>
        </div>

        {/* "the" */}
        <p
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.2rem, 10vw, 3rem)",
            color: GOLD,
            lineHeight: 1,
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            animation: visible
              ? "headingSwing 2s cubic-bezier(0.16,1,0.3,1) 0.1s both"
              : "none",
          }}
        >
          the
        </p>

        {/* COUNTDOWN */}
        <h2
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(1.8rem, 9vw, 2.5rem)",
            color: CREAM,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: "normal",
            marginTop: 0,
            marginBottom: "0.6rem",
            opacity: visible ? 1 : 0,
            animation: visible
              ? "headingSwing 2s cubic-bezier(0.16,1,0.3,1) 0.25s both"
              : "none",
          }}
        >
          Countdown
        </h2>

        <p
          style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.58rem",
            letterSpacing: "0.35em",
            color: DIM,
            textTransform: "uppercase",
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.35s",
          }}
        >
          To forever and beyond
        </p>

        {/* Flip-clock digits */}
        <div className="w-full max-w-sm flex items-end justify-center gap-1">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-end">
              <div
                className="flex flex-col items-center"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible
                    ? `unitRise 1.5s cubic-bezier(0.16,1,0.3,1) ${
                        0.4 + i * 0.15
                      }s both`
                    : "none",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <span
                    key={u.value}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-oranienbaum), serif",
                      fontSize: "clamp(2.4rem, 12vw, 3.8rem)",
                      color: CREAM,
                      lineHeight: 1,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {u.value}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-oranienbaum), serif",
                    fontSize: "0.48rem",
                    letterSpacing: "0.25em",
                    color: DIM,
                    textTransform: "uppercase",
                    marginTop: "0.5rem",
                  }}
                >
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "clamp(1.5rem, 7vw, 2.2rem)",
                    color: GOLD,
                    lineHeight: 1,
                    marginBottom: "1.6rem",
                    padding: "0 0.1rem",
                    opacity: 0.6,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm mt-12" />
      </div>
    </section>
  );
}
