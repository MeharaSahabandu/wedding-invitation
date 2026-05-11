"use client";

import Image from "next/image";

export default function Hero({ animate = false }: { animate?: boolean }) {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-4"
      style={{
        opacity: animate ? undefined : 0,
        animation: animate ? "fadeIn 0.6s ease forwards" : "none",
      }}
    >
      <style>{`
        @keyframes heroSlideDown {
          from { transform: translateY(-200vh); opacity: 0; }
          to   { transform: translateY(0);      opacity: 1; }
        }

        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-120px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(120px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ribbonWave {
          0%, 100% { transform: skewX(-3deg); }
          50%      { transform: skewX(3deg);  }
        }
        @keyframes flowerFall {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.45; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(170px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Full-screen background pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-pattern.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Center card */}
      <div
        className="relative z-10 overflow-hidden shadow-2xl rounded-3xl"
        style={{
          width: "min(360px, calc(100vw - 1.5rem))",
          minHeight: "min(840px, calc(100vh - 1rem))",
        }}
      >
        {/* Card background */}
        <div
          className="relative w-full h-full"
          style={{ minHeight: "inherit" }}
        >
          <Image
            src="/images/card-bg.png"
            alt=""
            fill
            className="object-cover"
          />

          {/* Card content */}
          <div
            className="relative z-10 flex flex-col items-center px-8 pt-4 pb-0"
            style={{ minHeight: "min(680px, calc(100vh - 2rem))" }}
          >
            {/* Bow at top */}
            <div
              className="w-24"
              style={{
                transformOrigin: "top center",
                animation: "ribbonWave 5s ease-in-out infinite",
              }}
            >
              <Image
                src="/icons/bow-top.svg"
                alt=""
                width={96}
                height={48}
                className="w-full"
              />
            </div>

            {/* Names block */}
            <div className="mt-6 text-center">
              {/* PRATHIBA — slides in from left */}
              <h1
                className="font-normal tracking-widest text-stone-800 leading-tight uppercase"
                style={{
                  fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                  fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
                  animation: "slideFromLeft 0.9s cubic-bezier(0.25, 0, 0.35, 1) 0.3s both",
                }}
              >
                PRATHIBA
              </h1>

              {/* & PATHUM — slides in from right */}
              <h1
                className="font-normal tracking-widest text-stone-800 leading-tight uppercase flex items-center justify-center"
                style={{
                  fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                  fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
                  gap: "0.2em",
                  animation: "slideFromRight 0.9s cubic-bezier(0.25, 0, 0.35, 1) 0.5s both",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                    color: "#A37254",
                    fontSize: "1em",
                  }}
                >
                  &amp;
                </span>
                PATHUM
              </h1>

              {/* Wedding script — fades in */}
              <p
                className="italic text-amber-800 mt-1 leading-none"
                style={{
                  fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
                  fontSize: "clamp(2rem, 9vw, 2.8rem)",
                  animation: "fadeIn 1.2s ease-in 0.8s both",
                }}
              >
                Wedding
              </p>
            </div>

            {/* Couple illustration — flush at bottom */}
            <div className="mt-auto w-4/5 self-center relative overflow-hidden">
              {/* Flower petals */}
              {[
                { left: "8%",  delay: "0s",   dur: "3.2s", size: 8 },
                { left: "22%", delay: "0.7s", dur: "2.8s", size: 7 },
                { left: "38%", delay: "1.4s", dur: "3.5s", size: 6 },
                { left: "52%", delay: "0.3s", dur: "3.0s", size: 9 },
                { left: "65%", delay: "1.1s", dur: "2.6s", size: 7 },
                { left: "80%", delay: "0.5s", dur: "3.3s", size: 6 },
                { left: "15%", delay: "1.8s", dur: "2.9s", size: 8 },
                { left: "72%", delay: "2.2s", dur: "3.1s", size: 7 },
                { left: "45%", delay: "2.6s", dur: "2.7s", size: 6 },
                { left: "90%", delay: "1.5s", dur: "3.4s", size: 8 },
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
                    color: "#A37254",
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
