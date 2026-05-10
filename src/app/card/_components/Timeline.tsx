"use client";

import Image from "next/image";

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

export default function Timeline() {
  return (
    <section className="w-full bg-white py-16 px-6">
      {/* Heading */}
      <div className="flex items-baseline justify-center gap-3 mb-14">
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

      {/* Timeline items — no center line, no dots */}
      <div className="max-w-sm mx-auto flex flex-col gap-12">
        {events.map((event, i) => {
          const isLeft = event.align === "left";
          return (
            <div
              key={i}
              className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
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
        })}
      </div>
    </section>
  );
}
