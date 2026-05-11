"use client";

import { useMemo, useState } from "react";

/* ---------- Scalloped wax-seal SVG path ---------- */
function makeSealPath(cx: number, cy: number, innerR: number, outerR: number, n: number) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2;
    const a2 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const vx = (cx + innerR * Math.cos(a0)).toFixed(2);
    const vy = (cy + innerR * Math.sin(a0)).toFixed(2);
    const px = (cx + outerR * Math.cos(a1)).toFixed(2);
    const py = (cy + outerR * Math.sin(a1)).toFixed(2);
    const nvx = (cx + innerR * Math.cos(a2)).toFixed(2);
    const nvy = (cy + innerR * Math.sin(a2)).toFixed(2);
    if (i === 0) d += `M ${vx},${vy} `;
    d += `Q ${px},${py} ${nvx},${nvy} `;
  }
  return d + "Z";
}

/* ---------- Dot ring inside seal ---------- */
function DotRing({ cx, cy, r, n, dotR }: { cx: number; cy: number; r: number; n: number; dotR: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={cx + r * Math.cos(a)}
            cy={cy + r * Math.sin(a)}
            r={dotR}
            fill="rgba(40,20,0,0.55)"
          />
        );
      })}
    </>
  );
}

/* ---------- Left botanical vine ---------- */
function LeftVine() {
  const col = "rgba(85,72,45,0.55)";
  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, width: "44%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 180 900"
      preserveAspectRatio="xMinYMin meet"
    >
      {/* Main stem */}
      <path d="M 55 -10 C 35 90 75 190 50 300 C 25 410 65 490 40 610 C 18 720 55 800 35 920"
        fill="none" stroke={col} strokeWidth="1.3" />
      {/* Branch cluster 1 */}
      <path d="M 52 60 C 85 50 110 35 130 15" fill="none" stroke={col} strokeWidth="0.9" />
      <path d="M 100 38 C 108 20 115 10 118 0" fill="none" stroke={col} strokeWidth="0.7" />
      <ellipse cx="95" cy="42" rx="7" ry="3.5" fill={col} transform="rotate(-35 95 42)" />
      <ellipse cx="115" cy="25" rx="6" ry="3" fill={col} transform="rotate(-50 115 25)" />
      <ellipse cx="128" cy="16" rx="5" ry="2.5" fill={col} transform="rotate(-60 128 16)" />
      {/* Branch cluster 2 */}
      <path d="M 48 140 C 80 125 105 115 125 100" fill="none" stroke={col} strokeWidth="0.9" />
      <ellipse cx="75" cy="130" rx="7" ry="3" fill={col} transform="rotate(-20 75 130)" />
      <ellipse cx="100" cy="118" rx="6" ry="3" fill={col} transform="rotate(-28 100 118)" />
      <ellipse cx="122" cy="103" rx="5.5" ry="2.5" fill={col} transform="rotate(-38 122 103)" />
      {/* Branch cluster 3 */}
      <path d="M 53 230 C 25 215 8 200 -5 185" fill="none" stroke={col} strokeWidth="0.9" />
      <ellipse cx="28" cy="213" rx="6" ry="3" fill={col} transform="rotate(20 28 213)" />
      <ellipse cx="8" cy="200" rx="5.5" ry="2.5" fill={col} transform="rotate(30 8 200)" />
      {/* Branch cluster 4 */}
      <path d="M 42 330 C 72 318 95 305 115 290" fill="none" stroke={col} strokeWidth="0.9" />
      <ellipse cx="68" cy="320" rx="6.5" ry="3" fill={col} transform="rotate(-18 68 320)" />
      <ellipse cx="92" cy="308" rx="6" ry="3" fill={col} transform="rotate(-26 92 308)" />
      <ellipse cx="112" cy="293" rx="5" ry="2.5" fill={col} transform="rotate(-35 112 293)" />
      {/* Branch cluster 5 */}
      <path d="M 44 430 C 20 420 5 408 -8 395" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="22" cy="420" rx="6" ry="2.8" fill={col} transform="rotate(18 22 420)" />
      <ellipse cx="4" cy="408" rx="5" ry="2.4" fill={col} transform="rotate(28 4 408)" />
      {/* Branch cluster 6 */}
      <path d="M 40 530 C 70 518 92 505 110 488" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="66" cy="520" rx="6" ry="2.8" fill={col} transform="rotate(-16 66 520)" />
      <ellipse cx="90" cy="508" rx="5.5" ry="2.5" fill={col} transform="rotate(-25 90 508)" />
      {/* Branch cluster 7 */}
      <path d="M 36 640 C 65 628 85 615 102 600" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="62" cy="630" rx="5.5" ry="2.5" fill={col} transform="rotate(-15 62 630)" />
      <ellipse cx="85" cy="618" rx="5" ry="2.3" fill={col} transform="rotate(-25 85 618)" />
      {/* Small hanging berries */}
      <circle cx="58" cy="168" r="2.5" fill={col} />
      <circle cx="55" cy="173" r="2" fill={col} />
      <circle cx="44" cy="390" r="2.5" fill={col} />
      <circle cx="40" cy="396" r="2" fill={col} />
    </svg>
  );
}

/* ---------- Right botanical vine ---------- */
function RightVine() {
  const col = "rgba(85,72,45,0.50)";
  return (
    <svg
      style={{ position: "absolute", right: 0, top: 0, width: "40%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 160 900"
      preserveAspectRatio="xMaxYMin meet"
    >
      {/* Main stem */}
      <path d="M 110 -10 C 130 80 95 180 115 290 C 135 400 100 480 118 600 C 135 715 105 790 120 920"
        fill="none" stroke={col} strokeWidth="1.2" />
      {/* Branch cluster 1 */}
      <path d="M 112 55 C 82 42 58 30 38 12" fill="none" stroke={col} strokeWidth="0.9" />
      <ellipse cx="82" cy="44" rx="6.5" ry="3" fill={col} transform="rotate(30 82 44)" />
      <ellipse cx="60" cy="32" rx="6" ry="2.8" fill={col} transform="rotate(42 60 32)" />
      <ellipse cx="40" cy="14" rx="5" ry="2.3" fill={col} transform="rotate(55 40 14)" />
      {/* Branch cluster 2 */}
      <path d="M 113 155 C 140 142 155 130 168 115" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="138" cy="144" rx="6" ry="2.8" fill={col} transform="rotate(-20 138 144)" />
      <ellipse cx="160" cy="120" rx="5" ry="2.3" fill={col} transform="rotate(-35 160 120)" />
      {/* Branch cluster 3 */}
      <path d="M 114 250 C 84 238 60 225 42 210" fill="none" stroke={col} strokeWidth="0.9" />
      <ellipse cx="82" cy="240" rx="6.5" ry="3" fill={col} transform="rotate(22 82 240)" />
      <ellipse cx="58" cy="228" rx="6" ry="2.8" fill={col} transform="rotate(32 58 228)" />
      <ellipse cx="44" cy="212" rx="5" ry="2.3" fill={col} transform="rotate(45 44 212)" />
      {/* Branch cluster 4 */}
      <path d="M 116 360 C 144 348 158 336 172 320" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="142" cy="350" rx="5.5" ry="2.5" fill={col} transform="rotate(-18 142 350)" />
      <ellipse cx="165" cy="325" rx="4.5" ry="2.1" fill={col} transform="rotate(-30 165 325)" />
      {/* Branch cluster 5 */}
      <path d="M 118 455 C 88 442 65 430 48 415" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="85" cy="444" rx="6" ry="2.7" fill={col} transform="rotate(20 85 444)" />
      <ellipse cx="62" cy="432" rx="5.5" ry="2.5" fill={col} transform="rotate(30 62 432)" />
      {/* Branch cluster 6 */}
      <path d="M 116 560 C 144 548 158 535 170 520" fill="none" stroke={col} strokeWidth="0.8" />
      <ellipse cx="140" cy="550" rx="5.5" ry="2.5" fill={col} transform="rotate(-17 140 550)" />
      {/* Berries */}
      <circle cx="108" cy="205" r="2.4" fill={col} />
      <circle cx="112" cy="211" r="1.9" fill={col} />
      <circle cx="118" cy="500" r="2.3" fill={col} />
      <circle cx="114" cy="506" r="1.8" fill={col} />
    </svg>
  );
}

/* ---------- Wax Seal ---------- */
function WaxSeal({ path }: { path: string }) {
  return (
    <svg width="220" height="220" viewBox="0 0 200 200" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))" }}>
      <defs>
        <radialGradient id="waxGrad" cx="42%" cy="38%" r="65%">
          <stop offset="0%"  stopColor="#c49a2e" />
          <stop offset="30%" stopColor="#9a7018" />
          <stop offset="65%" stopColor="#704e0c" />
          <stop offset="100%" stopColor="#4a3008" />
        </radialGradient>
        <radialGradient id="waxShine" cx="35%" cy="30%" r="60%">
          <stop offset="0%"  stopColor="rgba(255,220,120,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
        </radialGradient>
        <radialGradient id="outerRing" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#7a5c14" />
          <stop offset="100%" stopColor="#3d2808" />
        </radialGradient>
      </defs>

      {/* Drop shadow circle */}
      <circle cx="100" cy="104" r="86" fill="rgba(0,0,0,0.28)" />

      {/* Scalloped outer ring */}
      <path d={path} fill="url(#outerRing)" />

      {/* Main wax circle */}
      <circle cx="100" cy="100" r="72" fill="url(#waxGrad)" />

      {/* Shine overlay */}
      <circle cx="100" cy="100" r="72" fill="url(#waxShine)" />

      {/* Inner concentric ring */}
      <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(40,20,0,0.45)" strokeWidth="1.5" />

      {/* Dot ring */}
      <DotRing cx={100} cy={100} r={60} n={28} dotR={1.2} />

      {/* Second inner ring */}
      <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(40,20,0,0.3)" strokeWidth="0.8" />

      {/* Small floral ornament top */}
      <path d="M 92 52 Q 100 46 108 52 Q 104 58 100 56 Q 96 58 92 52 Z" fill="rgba(40,20,0,0.4)" />

      {/* PP Monogram */}
      <text
        x="100" y="110"
        textAnchor="middle"
        fill="rgba(25,12,0,0.82)"
        fontSize="44"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="bold"
        letterSpacing="2"
        style={{ fontStyle: "italic" }}
      >
        PP
      </text>

      {/* Small ornament bottom */}
      <path d="M 82 124 Q 91 132 100 128 Q 109 132 118 124" fill="none" stroke="rgba(40,20,0,0.4)" strokeWidth="1.2" />
      <circle cx="100" cy="133" r="2" fill="rgba(40,20,0,0.35)" />
    </svg>
  );
}

/* ---------- Main Component ---------- */
export default function CardOpener({ onOpened }: { onOpened?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [unmount, setUnmount] = useState(false);
  const sealPath = useMemo(() => makeSealPath(100, 100, 74, 90, 24), []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => { onOpened?.(); }, 500);
    setTimeout(() => setUnmount(true), 1400);
  };

  if (unmount) return null;

  return (
    <>
      <style>{`
        @keyframes sealPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4)); }
          50%       { transform: scale(1.03); filter: drop-shadow(0 12px 32px rgba(0,0,0,0.55)); }
        }
        @keyframes sealCrack {
          0%   { transform: scale(1); opacity: 1; }
          40%  { transform: scale(1.12); opacity: 0.9; }
          100% { transform: scale(0.6); opacity: 0; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
        onClick={handleOpen}
        style={{
          background: "#726d58",
          opacity: opened ? 0 : 1,
          transition: opened ? "opacity 1.1s ease 0.2s" : "none",
        }}
      >
        {/* Panel shading — lighter center, darker sides */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.18) 100%)",
          zIndex: 1,
        }} />
        {/* Subtle top-to-bottom darkening */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.18) 100%)",
          zIndex: 1,
        }} />

        {/* Botanical vines */}
        <LeftVine />
        <RightVine />

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div style={{
            animation: opened ? "sealCrack 0.6s ease forwards" : "sealPulse 3.5s ease-in-out infinite",
          }}>
            <WaxSeal path={sealPath} />
          </div>
        </div>

        {/* TAP TO OPEN bar at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-5"
          style={{
            background: "#0d0d0d",
            borderTop: "1px solid rgba(201,169,110,0.2)",
            zIndex: 3,
          }}
        >
          {/* Gold corner left */}
          <div style={{
            position: "absolute",
            left: "1.5rem",
            width: "1.5rem",
            height: "1.5rem",
            borderTop: "1px solid rgba(201,169,110,0.5)",
            borderLeft: "1px solid rgba(201,169,110,0.5)",
          }} />

          <p style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "0.65rem",
            letterSpacing: "0.5em",
            color: "rgba(201,169,110,0.75)",
            textTransform: "uppercase",
          }}>
            Tap to Open
          </p>

          {/* Gold corner right */}
          <div style={{
            position: "absolute",
            right: "1.5rem",
            width: "1.5rem",
            height: "1.5rem",
            borderTop: "1px solid rgba(201,169,110,0.5)",
            borderRight: "1px solid rgba(201,169,110,0.5)",
          }} />
        </div>
      </div>
    </>
  );
}
