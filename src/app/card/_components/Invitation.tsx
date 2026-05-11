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
      style={{ minHeight: "clamp(500px, 100dvh, 720px)", background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-18px); }
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
      `}</style>

      {/* Top dark fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, #0d0d0d 0%, #0d0d0d 30%, rgba(13,13,13,0.7) 70%, transparent 100%)",
        }}
      />

      {/* Bottom dark fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "200px",
          background: "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.9) 50%, transparent 100%)",
        }}
      />

      {/* Background garden image + butterflies */}
      <div className="absolute inset-0 z-0" style={{ overflow: "hidden" }}>
        <Image
          src="/images/garden.png"
          alt=""
          fill
          className="object-cover object-top"
          style={{ opacity: 0.25 }}
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
              opacity: 0.5,
              filter: "sepia(1) saturate(1.5) hue-rotate(5deg) brightness(1.2)",
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
          className="w-24 mb-8"
          style={{ animation: "floatUpDown 3s ease-in-out infinite" }}
        >
          <Image
            src="/icons/heart.svg"
            alt=""
            width={96}
            height={40}
            className="w-full"
            style={{ filter: "invert(78%) sepia(28%) saturate(500%) hue-rotate(5deg) brightness(95%)" }}
          />
        </div>

        {/* Gold line */}
        <div
          className="w-16 mb-6"
          style={{ height: "1px", background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }}
        />

        {/* Invitation text */}
        <p
          ref={textRef}
          className="text-center leading-relaxed text-base"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            color: "#a89880",
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
