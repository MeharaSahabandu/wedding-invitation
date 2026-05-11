"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a96e";
const CREAM = "#f0ebe0";
const DIM = "#8a8070";

const events = [
  { time: "10.30", label: "Poruwa Ceremony",  icon: "/icons/ring.svg",   align: "left"  },
  { time: "11.45", label: "Reception",         icon: "/icons/glass.svg",  align: "right" },
  { time: "11.50", label: "Photobooth Opens",  icon: "/icons/camera.svg", align: "left"  },
  { time: "12.00", label: "Buffet Opens",      icon: "/icons/food.svg",   align: "right" },
  { time: "14.30", label: "Dance Floor",       icon: "/icons/music.svg",  align: "left"  },
];

function TimelineRow({ event }: { event: typeof events[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = event.align === "left";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : isLeft ? "translateX(-60px)" : "translateX(60px)",
        transition: "opacity 1.1s ease, transform 1.1s ease",
      }}
    >
      {/* Icon */}
      <div className="flex-1 flex justify-center">
        <Image
          src={event.icon}
          alt={event.label}
          width={70}
          height={70}
          className="object-contain"
          style={{
            width: "clamp(50px, 15vw, 70px)",
            height: "clamp(50px, 15vw, 70px)",
            filter: "invert(78%) sepia(28%) saturate(500%) hue-rotate(5deg) brightness(95%)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* Time + label */}
      <div className={`flex-1 flex flex-col ${isLeft ? "items-start" : "items-end"}`}>
        <span
          className="leading-none"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "clamp(2rem, 10vw, 2.8rem)",
            color: GOLD,
          }}
        >
          {event.time}
        </span>
        <span
          className="text-sm mt-1 tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            color: DIM,
            fontSize: "0.65rem",
          }}
        >
          {event.label}
        </span>
      </div>
    </div>
  );
}

export default function Timeline() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 px-6" style={{ background: "#0d0d0d" }}>
      {/* Gold top rule */}
      <div className="max-w-sm mx-auto mb-12">
        <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      </div>

      {/* Heading */}
      <div
        ref={headingRef}
        className="flex flex-col items-center gap-1 mb-12"
        style={{
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}
      >
        <p
          className="tracking-[0.35em] uppercase"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "0.65rem",
            color: GOLD,
          }}
        >
          Order of the
        </p>
        <h2
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.8rem, 12vw, 3.5rem)",
            color: CREAM,
            lineHeight: 1,
          }}
        >
          Day
        </h2>
      </div>

      {/* Timeline items */}
      <div className="max-w-sm mx-auto flex flex-col gap-10">
        {events.map((event, i) => (
          <TimelineRow key={i} event={event} />
        ))}
      </div>

      {/* Gold bottom rule */}
      <div className="max-w-sm mx-auto mt-12">
        <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      </div>
    </section>
  );
}
