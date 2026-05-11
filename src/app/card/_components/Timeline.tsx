"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

const events = [
  { time: "3:30", label: "Guest Arrival" },
  { time: "4:00", label: "Poruwa Ceremony" },
  { time: "5:30", label: "Cocktail Hour" },
  { time: "6:30", label: "Dinner & Celebration" },
  { time: "8:30", label: "Dancing & Party" },
];

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#0d0d0d", minHeight: "clamp(640px, 105dvh, 860px)" }}
    >
      {/* Champagne glass — right side, full height */}
      <div
        className="absolute right-0 top-0 bottom-0"
        style={{ width: "58%", zIndex: 0 }}
      >
        <Image
          src="/images/champagne.jpg"
          alt=""
          fill
          className="object-cover object-top"
          style={{ opacity: 0.65 }}
        />
        {/* Fade from left — blends glass into dark background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #0d0d0d 0%, rgba(13,13,13,0.55) 45%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "120px",
            background: "linear-gradient(to top, #0d0d0d 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-7 pt-12 pb-14">

        {/* Heading: ORDER / of the / DAY */}
        <div
          className="mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.1s ease, transform 1.1s ease",
          }}
        >
          <p style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(1.9rem, 9vw, 2.6rem)",
            color: CREAM,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: "normal",
            lineHeight: 1,
            margin: 0,
          }}>
            Order
          </p>
          <p style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2rem, 9vw, 2.8rem)",
            color: CREAM,
            lineHeight: 0.9,
            margin: "0 0 0 1.2rem",
          }}>
            of the
          </p>
          <p style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(2.2rem, 10vw, 3rem)",
            color: CREAM,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: "normal",
            lineHeight: 1,
            margin: 0,
          }}>
            Day
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" style={{ paddingLeft: "0" }}>
          {/* Vertical connecting line */}
          <div
            style={{
              position: "absolute",
              left: "calc(4.5rem + 14px)",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background: `linear-gradient(to bottom, transparent, rgba(201,169,110,0.4) 10%, rgba(201,169,110,0.4) 90%, transparent)`,
              zIndex: 0,
            }}
          />

          {events.map((event, i) => (
            <div
              key={i}
              className="flex items-center"
              style={{
                marginBottom: i < events.length - 1 ? "clamp(1.4rem, 5vw, 2rem)" : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-40px)",
                transition: `opacity 1.1s ease ${0.15 + i * 0.12}s, transform 1.1s ease ${0.15 + i * 0.12}s`,
              }}
            >
              {/* Time column */}
              <div
                className="flex flex-col items-end"
                style={{ width: "4.5rem", marginRight: "0.9rem", flexShrink: 0 }}
              >
                <span style={{
                  fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
                  fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
                  color: CREAM,
                  lineHeight: 1,
                }}>
                  {event.time}
                </span>
                <span style={{
                  fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
                  fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                  color: GOLD,
                  lineHeight: 1,
                  marginTop: "-0.1rem",
                }}>
                  pm
                </span>
              </div>

              {/* Gold dot */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "rgba(201,169,110,0.5)",
                  border: "1px solid rgba(201,169,110,0.8)",
                  flexShrink: 0,
                  zIndex: 1,
                  position: "relative",
                }}
              />

              {/* Event label */}
              <span style={{
                fontFamily: "var(--font-oranienbaum), serif",
                fontSize: "clamp(0.6rem, 2.5vw, 0.72rem)",
                letterSpacing: "0.22em",
                color: DIM,
                textTransform: "uppercase",
                marginLeft: "0.9rem",
              }}>
                {event.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
