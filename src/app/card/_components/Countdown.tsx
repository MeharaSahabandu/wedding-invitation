"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

// June 4, 2026 at 4:00 PM Sri Lanka time (UTC+5:30)
const WEDDING = new Date("2026-06-04T16:00:00+05:30").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = WEDDING - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  const units = [
    { label: "Days", value: pad(time.days) },
    { label: "Hours", value: pad(time.hours) },
    { label: "Minutes", value: pad(time.minutes) },
    { label: "Seconds", value: pad(time.seconds) },
  ];

  return (
    <section
      ref={ref}
      className="w-full py-16 px-6 flex flex-col items-center"
      style={{ background: "#0d0d0d" }}
    >
      {/* "the" script */}
      <p
        style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(2.2rem, 10vw, 3rem)",
          color: GOLD,
          lineHeight: 1,
          marginBottom: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}
      >
        the
      </p>

      {/* "COUNTDOWN" in Cinzel */}
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
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease 0.1s, transform 1.1s ease 0.1s",
        }}
      >
        Countdown
      </h2>

      {/* "TO FOREVER AND BEYOND" */}
      <p
        style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.58rem",
          letterSpacing: "0.35em",
          color: DIM,
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.1s ease 0.2s",
        }}
      >
        To forever and beyond
      </p>

      {/* Timer digits */}
      <div
        className="w-full max-w-sm flex items-end justify-center gap-1"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
        }}
      >
        {units.map((u, i) => (
          <div key={u.label} className="flex items-end">
            <div className="flex flex-col items-center">
              <span
                style={{
                  fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                  fontSize: "clamp(2.2rem, 11vw, 3.5rem)",
                  color: CREAM,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {u.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.25em",
                  color: DIM,
                  textTransform: "uppercase",
                  marginTop: "0.4rem",
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
                  marginBottom: "1.2rem",
                  padding: "0 0.15rem",
                  opacity: 0.7,
                }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Gold rule bottom */}
      <div className="w-full max-w-sm mt-12"></div>
    </section>
  );
}
