"use client";

import Image from "next/image";

export default function Hero({ animate = false }: { animate?: boolean }) {
  return (
    <section
      className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden"
      style={{
        opacity: animate ? undefined : 0,
        animation: animate ? "fadeIn 0.8s ease forwards" : "none",
        background: "#0d0d0d",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ribbonWave {
          0%, 100% { transform: skewX(-3deg); }
          50%      { transform: skewX(3deg);  }
        }
        @keyframes flowerFall {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.3; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(170px) rotate(360deg); opacity: 0; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* Subtle dark texture overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image src="/images/bg-pattern.png" alt="" fill className="object-cover" priority />
      </div>

      {/* Gold corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 opacity-30" style={{ borderTop: "1px solid #c9a96e", borderLeft: "1px solid #c9a96e" }} />
      <div className="absolute top-8 right-8 w-12 h-12 opacity-30" style={{ borderTop: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" }} />
      <div className="absolute bottom-8 left-8 w-12 h-12 opacity-30" style={{ borderBottom: "1px solid #c9a96e", borderLeft: "1px solid #c9a96e" }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 opacity-30" style={{ borderBottom: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" }} />

      {/* Center card */}
      <div
        className="relative z-10 flex flex-col items-center px-8 py-12 w-full"
        style={{ maxWidth: "min(400px, 100vw)" }}
      >
        {/* Invitation label */}
        <p
          className="tracking-[0.35em] uppercase mb-6 text-center"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "0.65rem",
            color: "#c9a96e",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeUp 1s ease 0.3s both" : "none",
          }}
        >
          You are invited to celebrate
        </p>

        {/* Gold divider */}
        <div
          className="w-16 mb-6"
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeIn 1s ease 0.4s both" : "none",
          }}
        />

        {/* Names block */}
        <div
          className="text-center mb-4"
          style={{ opacity: animate ? undefined : 0 }}
        >
          <h1
            className="font-normal tracking-widest leading-tight uppercase"
            style={{
              fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
              fontSize: "clamp(2rem, 9vw, 2.8rem)",
              color: "#f0ebe0",
              animation: animate ? "slideFromLeft 0.9s cubic-bezier(0.25, 0, 0.35, 1) 0.2s both" : "none",
            }}
          >
            PRATHIBA
          </h1>

          <p
            className="italic my-1"
            style={{
              fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
              fontSize: "clamp(1.4rem, 6vw, 1.8rem)",
              color: "#c9a96e",
              animation: animate ? "fadeIn 1s ease 0.35s both" : "none",
            }}
          >
            and
          </p>

          <h1
            className="font-normal tracking-widest leading-tight uppercase"
            style={{
              fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
              fontSize: "clamp(2rem, 9vw, 2.8rem)",
              color: "#f0ebe0",
              animation: animate ? "slideFromRight 0.9s cubic-bezier(0.25, 0, 0.35, 1) 0.3s both" : "none",
            }}
          >
            PATHUM
          </h1>
        </div>

        {/* Wedding script */}
        <p
          className="italic mb-8"
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(2.2rem, 10vw, 3rem)",
            color: "#c9a96e",
            animation: animate ? "fadeUp 1.2s ease 0.4s both" : "none",
          }}
        >
          Wedding
        </p>

        {/* Gold divider */}
        <div
          className="w-24 mb-8"
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
            animation: animate ? "fadeIn 1s ease 0.6s both" : "none",
          }}
        />

        {/* Couple illustration */}
        <div className="w-3/4 relative overflow-hidden">
          {[
            { left: "8%",  delay: "0s",   dur: "3.2s", size: 8 },
            { left: "22%", delay: "0.7s", dur: "2.8s", size: 7 },
            { left: "38%", delay: "1.4s", dur: "3.5s", size: 6 },
            { left: "52%", delay: "0.3s", dur: "3.0s", size: 9 },
            { left: "65%", delay: "1.1s", dur: "2.6s", size: 7 },
            { left: "80%", delay: "0.5s", dur: "3.3s", size: 6 },
          ].map((f, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: f.left,
                fontSize: f.size,
                opacity: 0,
                animation: `flowerFall ${f.dur} ease-in ${f.delay} infinite`,
                pointerEvents: "none",
                userSelect: "none",
                color: "#c9a96e",
              }}
            >
              ✿
            </span>
          ))}
          <Image
            src="/icons/couple-bottom.svg"
            alt="Bride and Groom"
            width={240}
            height={160}
            className="w-full"
            style={{
              filter: "invert(1) brightness(0.7) sepia(0.3)",
              animation: animate ? "fadeUp 1.2s ease 0.5s both" : "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
