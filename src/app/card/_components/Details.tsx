"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

const items = [
  {
    title: "Dress Code",
    icon: "✦",
    body: "Smart formal attire. We kindly request guests to dress elegantly for our special day. Ladies are encouraged to wear sarees, gowns, or formal dresses. Gentlemen are welcome in suits or national dress.",
  },
  {
    title: "Children",
    icon: "✦",
    body: "We warmly welcome children to join us in our celebration. Please let us know in your RSVP if you will be bringing little ones so we can make arrangements to ensure everyone is comfortable.",
  },
  {
    title: "Accommodation",
    icon: "✦",
    body: "Vinrich Lake Resort offers overnight accommodation for our guests. For reservations and availability, please contact the resort directly. Limited rooms are available, so we recommend booking early.",
  },
];

function DetailItem({ item, index }: { item: typeof items[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 1.1s ease ${index * 0.12}s, transform 1.1s ease ${index * 0.12}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4"
        style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          color: open ? GOLD : CREAM,
          textTransform: "uppercase",
          transition: "color 0.3s ease",
        }}>
          {item.icon} &nbsp; {item.title}
        </span>
        <span style={{
          color: GOLD,
          fontSize: "0.7rem",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.35s ease",
          display: "inline-block",
          lineHeight: 1,
        }}>
          ✕
        </span>
      </button>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: open
          ? `linear-gradient(to right, transparent, ${GOLD}, transparent)`
          : `linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)`,
        transition: "background 0.3s ease",
      }} />

      {/* Body */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "200px" : "0",
        transition: "max-height 0.45s ease",
      }}>
        <p style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.82rem",
          color: DIM,
          lineHeight: 1.85,
          padding: "1rem 0 0.5rem",
        }}>
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function Details() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full py-16 px-6" style={{ background: "#0d0d0d" }}>
      <div className="max-w-sm mx-auto">

        {/* Gold rule top */}
        <div style={{
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginBottom: "3rem",
        }} />

        {/* Heading */}
        <div
          ref={headingRef}
          className="flex flex-col items-center gap-0 mb-10"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1.1s ease, transform 1.1s ease",
          }}
        >
          <p style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2rem, 9vw, 2.8rem)",
            color: GOLD,
            lineHeight: 1,
            marginBottom: 0,
          }}>
            the
          </p>
          <h2 style={{
            fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
            fontSize: "clamp(1.6rem, 8vw, 2.2rem)",
            color: CREAM,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: "normal",
            marginTop: 0,
          }}>
            Details
          </h2>
        </div>

        {/* Accordion items */}
        {items.map((item, i) => (
          <DetailItem key={i} item={item} index={i} />
        ))}

        {/* Gold rule bottom */}
        <div style={{
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          marginTop: "2.5rem",
        }} />
      </div>
    </section>
  );
}
