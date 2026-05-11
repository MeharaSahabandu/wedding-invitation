"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BRAND = "#A37254";

const events = [
  {
    time: "10.30",
    label: "Poruwa Ceremony",
    icon: "/icons/ring.svg",
    align: "left",
  },
  {
    time: "11.45",
    label: "Reception",
    icon: "/icons/glass.svg",
    align: "right",
  },
  {
    time: "11.50",
    label: "Photobooth Opens",
    icon: "/icons/camera.svg",
    align: "left",
  },
  {
    time: "12.00",
    label: "Buffet Opens",
    icon: "/icons/food.svg",
    align: "right",
  },
  {
    time: "14.30",
    label: "Dance Floor",
    icon: "/icons/music.svg",
    align: "left",
  },
];

function TimelineRow({ event }: { event: typeof events[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = event.align === "left";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
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
        transform: visible
          ? "translateX(0)"
          : isLeft
          ? "translateX(-80px)"
          : "translateX(80px)",
        transition: "opacity 1.1s ease, transform 1.1s ease",
      }}
    >
      {/* Icon */}
      <div className="flex-1 flex justify-center">
        <Image
          src={event.icon}
          alt={event.label}
          width={90}
          height={90}
          className="object-contain"
          style={{
            width: 90,
            height: 90,
            filter:
              "invert(57%) sepia(31%) saturate(494%) hue-rotate(340deg) brightness(88%)",
          }}
        />
      </div>

      {/* Time + label */}
      <div
        className={`flex-1 flex flex-col ${isLeft ? "items-start" : "items-end"}`}
      >
        <span
          className="text-5xl leading-none"
          style={{ fontFamily: "'Oranienbaum', serif", color: BRAND }}
        >
          {event.time}
        </span>
        <span
          className="text-sm mt-1 tracking-wide"
          style={{ fontFamily: "'Oranienbaum', serif", color: BRAND }}
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-16 px-6">
      {/* Heading */}
      <div
        ref={headingRef}
        className="flex items-baseline justify-center gap-3 mb-14"
        style={{
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}
      >
        <h2
          className="text-5xl"
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            color: BRAND,
          }}
        >
          Timeline
        </h2>
        <span
          className="text-xl font-light"
          style={{ fontFamily: "'Oranienbaum', serif", color: "#b8a090" }}
        >
          of the Day
        </span>
      </div>

      {/* Timeline items */}
      <div className="max-w-sm mx-auto flex flex-col gap-12">
        {events.map((event, i) => (
          <TimelineRow key={i} event={event} />
        ))}
      </div>
    </section>
  );
}
