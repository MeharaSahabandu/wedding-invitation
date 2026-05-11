"use client";

import Image from "next/image";
import { useState } from "react";

function EnvelopeSVG({ opened }: { opened: boolean }) {
  return (
    <svg
      viewBox="0 0 300 188"
      width="100%"
      style={{
        filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.7))",
        transform: opened ? "scale(1.06) translateY(-8px)" : "scale(1)",
        transition: "transform 0.7s ease",
      }}
    >
      <defs>
        <radialGradient id="hSeal" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#d4a82a" />
          <stop offset="45%" stopColor="#9c720e" />
          <stop offset="100%" stopColor="#5a3a06" />
        </radialGradient>
        <radialGradient id="hSealShine" cx="38%" cy="30%" r="55%">
          <stop offset="0%" stopColor="rgba(255,215,80,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>

      {/* ── Envelope body ── */}
      <rect
        x="1.5"
        y="1.5"
        width="297"
        height="185"
        rx="2"
        fill="url(#envBody)"
      />
      {/* Gold outer border */}
      <rect
        x="1.5"
        y="1.5"
        width="297"
        height="185"
        rx="2"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="1.6"
      />

      {/* ── Fold lines ── */}
      {/* Top flap – two lines from top corners meeting at vertical center */}
      <line
        x1="1.5"
        y1="1.5"
        x2="150"
        y2="95"
        stroke="rgba(201,169,110,0.55)"
        strokeWidth="1.1"
      />
      <line
        x1="298.5"
        y1="1.5"
        x2="150"
        y2="95"
        stroke="rgba(201,169,110,0.55)"
        strokeWidth="1.1"
      />
      {/* Bottom fold lines from bottom corners */}
      <line
        x1="1.5"
        y1="186.5"
        x2="116"
        y2="112"
        stroke="rgba(201,169,110,0.38)"
        strokeWidth="0.9"
      />
      <line
        x1="298.5"
        y1="186.5"
        x2="184"
        y2="112"
        stroke="rgba(201,169,110,0.38)"
        strokeWidth="0.9"
      />

      {/* ── Ribbon band across center ── */}
      {/* Slight dark backing so ribbon stands out */}
      <rect x="0" y="82" width="300" height="22" fill="rgba(8,8,8,0.55)" />
      {/* Top ribbon line */}
      <line
        x1="0"
        y1="82"
        x2="300"
        y2="82"
        stroke="rgba(201,169,110,0.55)"
        strokeWidth="1"
      />
      {/* Bottom ribbon line */}
      <line
        x1="0"
        y1="104"
        x2="300"
        y2="104"
        stroke="rgba(201,169,110,0.55)"
        strokeWidth="1"
      />

      {/* ── Wax seal ── */}
      {/* Outer shadow */}
      <circle cx="150" cy="94" r="24" fill="rgba(0,0,0,0.35)" />
      {/* Seal background */}
      <circle cx="150" cy="93" r="22" fill="url(#hSeal)" />
      {/* Shine */}
      <circle cx="150" cy="93" r="22" fill="url(#hSealShine)" />
      {/* Inner ring */}
      <circle
        cx="150"
        cy="93"
        r="19"
        fill="none"
        stroke="rgba(40,20,0,0.4)"
        strokeWidth="1.1"
      />
      {/* Heart ♥ */}
      <text
        x="150"
        y="99"
        textAnchor="middle"
        fontSize="18"
        fill="rgba(25,10,0,0.75)"
      >
        ♥
      </text>
    </svg>
  );
}

export default function CardOpener({ onOpened }: { onOpened?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [unmount, setUnmount] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      onOpened?.();
    }, 700);
    setTimeout(() => setUnmount(true), 2000);
  };

  if (unmount) return null;

  return (
    <>
      <style>{`
        @keyframes sparkle {
          0%,100% { opacity: 0; transform: scale(0.6); }
          50%      { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
        onClick={handleOpen}
        style={{
          background: "#111",
          opacity: opened ? 0 : 1,
          transition: opened ? "opacity 1.1s ease 0.5s" : "none",
        }}
      >
        {/* ── Background: dark leaf texture ── */}
        <div className="absolute inset-0">
          <Image
            src="/images/leftcard.png"
            alt=""
            fill
            className="object-cover"
            style={{
              opacity: 0.5,
              objectPosition: "center 25%",
              filter: "brightness(0.38) grayscale(0.15)",
            }}
            priority
          />
          {/* Extra dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.2) 100%)",
            }}
          />
        </div>

        {/* Gold sparkle particles (lower left, like the reference) */}
        {[
          { left: "8%", bottom: "22%", size: 3, delay: "0s", dur: "2.8s" },
          { left: "14%", bottom: "18%", size: 2, delay: "0.6s", dur: "2.3s" },
          { left: "5%", bottom: "15%", size: 4, delay: "1.1s", dur: "3.1s" },
          { left: "20%", bottom: "25%", size: 2, delay: "0.3s", dur: "2.6s" },
          { left: "10%", bottom: "12%", size: 3, delay: "1.5s", dur: "2.4s" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.left,
              bottom: s.bottom,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#c9a96e",
              animation: `sparkle ${s.dur} ease-in-out ${s.delay} infinite`,
              zIndex: 2,
            }}
          />
        ))}

        {/* ── Content ── */}
        <div
          className="absolute inset-0 flex flex-col items-center z-10"
          style={{ paddingTop: "clamp(3rem, 10dvh, 5rem)" }}
        >
          {/* YOU HAVE AN INVITATION FROM */}
          <p
            style={{
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              fontSize: "clamp(0.52rem, 2.2vw, 0.65rem)",
              letterSpacing: "0.32em",
              color: "rgba(240,235,224,0.75)",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              animation: "fadeUpIn 1s ease 0.1s both",
            }}
          >
            You Have an Invitation From
          </p>

          {/* PRATHIBA — large elegant serif, lowercase feel */}
          <h1
            style={{
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              fontSize: "clamp(4rem, 22vw, 5.5rem)",
              color: "#f0ebe0",
              fontWeight: "normal",
              lineHeight: 0.82,
              margin: 0,
              letterSpacing: "-0.01em",
              animation: "fadeUpIn 1s ease 0.2s both",
            }}
          >
            Prathibha
          </h1>

          {/* "and" script — overlapping, offset right */}
          <p
            style={{
              fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
              fontSize: "clamp(2rem, 9vw, 2.6rem)",
              color: "#c9a96e",
              lineHeight: 1,
              margin: "-0.3rem 0 -0.3rem 3rem",
              alignSelf: "center",
              animation: "fadeUpIn 1s ease 0.28s both",
            }}
          >
            and
          </p>

          {/* PATHUM — bold caps */}
          <h1
            style={{
              fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
              fontSize: "clamp(2.2rem, 12vw, 3.2rem)",
              color: "#f0ebe0",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "900",
              margin: 0,
              lineHeight: 1,
              animation: "fadeUpIn 1s ease 0.35s both",
            }}
          >
            Pathum
          </h1>

          {/* ── Envelope ── */}
          <div
            style={{
              width: "clamp(230px, 72vw, 295px)",
              marginTop: "clamp(1.5rem, 5dvh, 2.5rem)",
              animation: "fadeUpIn 1s ease 0.5s both",
            }}
          >
            <EnvelopeSVG opened={opened} />
          </div>

          {/* CLICK ENVELOPE TO OPEN */}
          <p
            style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "clamp(0.52rem, 2.2vw, 0.62rem)",
              letterSpacing: "0.35em",
              color: "rgba(201,169,110,0.6)",
              textTransform: "uppercase",
              marginTop: "clamp(1rem, 3dvh, 1.8rem)",
              opacity: opened ? 0 : 1,
              transition: "opacity 0.3s ease",
              animation: "fadeUpIn 1s ease 0.7s both",
            }}
          >
            Tap Envelope to Open
          </p>
        </div>
      </div>
    </>
  );
}
