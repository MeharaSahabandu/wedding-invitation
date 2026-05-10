"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-4">
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
            <div className="w-24">
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
              {/* PRATHIBA */}
              <h1
                className="font-normal tracking-widest text-stone-800 leading-tight uppercase"
                style={{
                  fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                  fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
                }}
              >
                PRATHIBA
              </h1>

              {/* & PATHUM on same line */}
              <h1
                className="font-normal tracking-widest text-stone-800 leading-tight uppercase flex items-center justify-center"
                style={{
                  fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                  fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
                  gap: "0.2em",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-cinzel), 'Cinzel Decorative', serif",
                    color: "#A37254",
                    fontSize: "1em",
                  }}
                >
                  &amp;
                </span>
                PATHUM
              </h1>

              {/* Wedding script */}
              <p
                className="italic text-amber-800 mt-1 leading-none"
                style={{
                  fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
                  fontSize: "clamp(2rem, 9vw, 2.8rem)",
                }}
              >
                Wedding
              </p>
            </div>

            {/* Couple illustration — flush at bottom */}
            <div className="mt-auto w-4/5 self-center">
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
