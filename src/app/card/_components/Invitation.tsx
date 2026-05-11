"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Invitation() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTextVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(500px, 100dvh, 720px)" }}
    >
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-22px); }
        }
        @keyframes butterflyFly1 {
          0%   { transform: translate(0px, 0px) rotate(0deg) scaleX(1); }
          20%  { transform: translate(40px, -30px) rotate(10deg) scaleX(-1); }
          40%  { transform: translate(80px, -10px) rotate(-8deg) scaleX(1); }
          60%  { transform: translate(50px, -50px) rotate(12deg) scaleX(-1); }
          80%  { transform: translate(20px, -20px) rotate(-5deg) scaleX(1); }
          100% { transform: translate(0px, 0px) rotate(0deg) scaleX(1); }
        }
        @keyframes butterflyFly2 {
          0%   { transform: translate(0px, 0px) scaleX(1); }
          25%  { transform: translate(-35px, -40px) scaleX(-1); }
          50%  { transform: translate(-60px, -15px) scaleX(1); }
          75%  { transform: translate(-30px, -55px) scaleX(-1); }
          100% { transform: translate(0px, 0px) scaleX(1); }
        }
        @keyframes butterflyFly3 {
          0%   { transform: translate(0px, 0px) scaleX(1); }
          30%  { transform: translate(25px, -45px) scaleX(-1); }
          60%  { transform: translate(-20px, -30px) scaleX(1); }
          100% { transform: translate(0px, 0px) scaleX(1); }
        }
        @keyframes wingFlap {
          0%, 100% { transform: scaleY(1); }
          50%       { transform: scaleY(0.6); }
        }

      `}</style>

      {/* Top white fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: "240px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.5) 70%, transparent 100%)",
        }}
      />

      {/* Bottom white fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "200px",
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
        }}
      />

      {/* Background garden image + butterflies confined to it */}
      <div className="absolute inset-0 z-0" style={{ overflow: "hidden" }}>
        <Image
          src="/images/garden.png"
          alt=""
          fill
          className="object-cover object-top"
        />
        {[
          { top: "58%", left: "10%", anim: "butterflyFly1", dur: "7s",  delay: "0s" },
          { top: "65%", left: "70%", anim: "butterflyFly2", dur: "9s",  delay: "1.5s" },
          { top: "72%", left: "30%", anim: "butterflyFly3", dur: "8s",  delay: "0.8s" },
          { top: "60%", left: "50%", anim: "butterflyFly1", dur: "10s", delay: "2.5s" },
          { top: "78%", left: "80%", anim: "butterflyFly2", dur: "7s",  delay: "3.2s" },
          { top: "70%", left: "20%", anim: "butterflyFly3", dur: "11s", delay: "1s" },
        ].map((b, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: b.top,
              left: b.left,
              fontSize: 11,
              pointerEvents: "none",
              userSelect: "none",
              animation: `${b.anim} ${b.dur} ease-in-out ${b.delay} infinite`,
              display: "inline-block",
              opacity: 0.7,
              filter: "sepia(1) saturate(1.2) hue-rotate(320deg) brightness(0.75)",
            }}
          >
            🦋
          </span>
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center px-8 pt-8"
        style={{ paddingBottom: "clamp(14rem, 38dvh, 26rem)" }}
      >
        {/* Heart icon */}
        <div
          className="w-28 mb-8"
          style={{ animation: "floatUpDown 3s ease-in-out infinite" }}
        >
          <Image
            src="/icons/heart.svg"
            alt=""
            width={112}
            height={40}
            className="w-full"
            style={{ filter: "sepia(60%) saturate(60%) hue-rotate(340deg)" }}
          />
        </div>

        {/* Invitation text */}
        <p
          ref={textRef}
          className="text-center leading-relaxed text-base"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            color: "#92593a",
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s",
          }}
        >
          As we prepare to walk hand-in-hand into a new chapter of our lives, we
          find our greatest joy is in the people who have walked beside us along
          the way. Your love and friendship have shaped our story, and it would
          mean the world to us to have you there as we exchange our vows. Please
          join us for a day of laughter, love, and a celebration of the
          beautiful journey ahead
        </p>
      </div>
    </section>
  );
}
