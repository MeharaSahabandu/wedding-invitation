"use client";

import Image from "next/image";
import { useState } from "react";

function EnvelopeSVG({ opened }: { opened: boolean }) {
  const W = 300, H = 190, cx = 150, flapTip = 100;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{
        filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.85))",
        transform: opened ? "scale(1.04) translateY(-8px)" : "scale(1)",
        transition: "transform 0.8s cubic-bezier(0.25,0,0.35,1)",
      }}
    >
      <defs>
        <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#181818" />
          <stop offset="100%" stopColor="#101010" />
        </linearGradient>
        {/* Flap is slightly different tone */}
        <linearGradient id="flapFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        {/* Shadow strip under flap fold */}
        <linearGradient id="flapShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        {/* Wax seal */}
        <radialGradient id="sealG" cx="32%" cy="28%" r="68%">
          <stop offset="0%"   stopColor="#e2b84a" />
          <stop offset="35%"  stopColor="#b8860b" />
          <stop offset="100%" stopColor="#6b4500" />
        </radialGradient>
        <radialGradient id="sealShine" cx="30%" cy="25%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,220,100,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <clipPath id="envClip">
          <rect x="0" y="0" width={W} height={H} rx="3" />
        </clipPath>
      </defs>

      {/* ── Envelope body ── */}
      <rect x="0" y="0" width={W} height={H} rx="3" fill="url(#envBody)" />

      {/* ── Top flap triangle (pointing down) ── */}
      <polygon
        points={`0,0 ${W},0 ${cx},${flapTip}`}
        fill="url(#flapFill)"
        clipPath="url(#envClip)"
      />

      {/* ── Shadow strip just below the flap fold line, for depth ── */}
      <polygon
        points={`0,0 ${W},0 ${cx},${flapTip + 14} ${cx},${flapTip}`}
        fill="url(#flapShadow)"
        clipPath="url(#envClip)"
        opacity="0.7"
      />

      {/* ── Wax seal — rounded square (squircle) ── */}
      {/* Drop shadow */}
      <rect
        x={cx - 26} y={flapTip - 20}
        width="52" height="52" rx="12"
        fill="rgba(0,0,0,0.55)"
        transform={`rotate(-8,${cx},${flapTip + 6})`}
      />
      {/* Seal body */}
      <rect
        x={cx - 25} y={flapTip - 22}
        width="50" height="50" rx="11"
        fill="url(#sealG)"
        transform={`rotate(-8,${cx},${flapTip + 3})`}
      />
      {/* Shine */}
      <rect
        x={cx - 25} y={flapTip - 22}
        width="50" height="50" rx="11"
        fill="url(#sealShine)"
        transform={`rotate(-8,${cx},${flapTip + 3})`}
      />
      {/* Inner emboss ring */}
      <rect
        x={cx - 19} y={flapTip - 16}
        width="38" height="38" rx="8"
        fill="none"
        stroke="rgba(40,18,0,0.4)" strokeWidth="1"
        transform={`rotate(-8,${cx},${flapTip + 3})`}
      />
      {/* Heart */}
      <text
        x={cx - 1} y={flapTip + 8}
        textAnchor="middle" fontSize="15"
        fill="rgba(20,8,0,0.75)"
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
    setTimeout(() => {
      setUnmount(true);
      document.body.style.overflow = "";
    }, 2000);
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
        {/* Background: 6.jpg flower */}
        <div className="absolute inset-0">
          <Image
            src="/images/6.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              opacity: 0.55,
              objectPosition: "center center",
              filter: "brightness(0.45)",
            }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.15) 100%)",
            }}
          />
        </div>

        {/* Gold sparkle particles */}
        {[
          { left: "8%",  bottom: "22%", size: 3, delay: "0s",   dur: "2.8s" },
          { left: "14%", bottom: "18%", size: 2, delay: "0.6s", dur: "2.3s" },
          { left: "5%",  bottom: "15%", size: 4, delay: "1.1s", dur: "3.1s" },
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

        {/* Content */}
        <div
          className="absolute inset-0 flex flex-col items-center z-10"
          style={{ paddingTop: "clamp(3rem, 10dvh, 5rem)" }}
        >
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

          {/* Prathibha — Mea Culpa script */}
          <h1
            style={{
              fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
              fontSize: "clamp(3rem, 16vw, 4.8rem)",
              color: "#f0ebe0",
              fontWeight: "normal",
              lineHeight: 0.85,
              margin: 0,
              animation: "fadeUpIn 1s ease 0.2s both",
            }}
          >
            Prathibha
          </h1>

          {/* "and" */}
          <p
            style={{
              fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
              fontSize: "clamp(2rem, 9vw, 2.6rem)",
              color: "#c9a96e",
              lineHeight: 1,
              margin: "-0.2rem 0 -0.2rem 3rem",
              alignSelf: "center",
              animation: "fadeUpIn 1s ease 0.28s both",
            }}
          >
            and
          </p>

          {/* Pathum — Mea Culpa script */}
          <h1
            style={{
              fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
              fontSize: "clamp(3rem, 16vw, 4.8rem)",
              color: "#f0ebe0",
              fontWeight: "normal",
              lineHeight: 0.85,
              margin: 0,
              animation: "fadeUpIn 1s ease 0.35s both",
            }}
          >
            Pathum
          </h1>

          {/* Envelope */}
          <div
            style={{
              width: "clamp(230px, 72vw, 295px)",
              marginTop: "clamp(2.2rem, 7dvh, 3.5rem)",
              animation: "fadeUpIn 1s ease 0.5s both",
            }}
          >
            <EnvelopeSVG opened={opened} />
          </div>

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
