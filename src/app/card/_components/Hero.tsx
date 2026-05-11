"use client";

import Image from "next/image";

export default function Hero({ animate = false }: { animate?: boolean }) {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100dvh", background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideL  { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideR  { from { opacity: 0; transform: translateX(60px); }  to { opacity: 1; transform: translateX(0); } }
        @keyframes flowerFall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.35; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(180px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Subtle dark texture */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <Image src="/images/bg-pattern.png" alt="" fill className="object-cover" priority />
      </div>

      {/* Gold corner brackets */}
      <div className="absolute top-7 left-7 w-10 h-10 opacity-40"
        style={{ borderTop: "1px solid #c9a96e", borderLeft: "1px solid #c9a96e" }} />
      <div className="absolute top-7 right-7 w-10 h-10 opacity-40"
        style={{ borderTop: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" }} />
      <div className="absolute bottom-7 left-7 w-10 h-10 opacity-40"
        style={{ borderBottom: "1px solid #c9a96e", borderLeft: "1px solid #c9a96e" }} />
      <div className="absolute bottom-7 right-7 w-10 h-10 opacity-40"
        style={{ borderBottom: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" }} />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8 py-14 w-full"
        style={{ maxWidth: "min(420px, 100vw)" }}
      >
        {/* YOU HAVE AN INVITATION FROM */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
          fontSize: "0.58rem",
          letterSpacing: "0.32em",
          color: "#c9a96e",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeUp 1s ease 0.15s both" : "none",
        }}>
          You have an invitation from
        </p>

        {/* Top gold rule */}
        <div style={{
          width: "4rem",
          height: "1px",
          background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
          marginBottom: "1.2rem",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeIn 1s ease 0.25s both" : "none",
        }} />

        {/* PRATHIBA — large Mea Culpa script */}
        <h1 style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(4rem, 22vw, 6rem)",
          color: "#f0ebe0",
          lineHeight: 0.85,
          fontWeight: "normal",
          margin: 0,
          opacity: animate ? undefined : 0,
          animation: animate ? "slideL 0.95s cubic-bezier(0.25,0,0.35,1) 0.2s both" : "none",
        }}>
          Prathiba
        </h1>

        {/* and */}
        <p style={{
          fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
          fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
          color: "#c9a96e",
          margin: "0.1rem 0",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeIn 1s ease 0.3s both" : "none",
        }}>
          and
        </p>

        {/* PATHUM — Cinzel caps */}
        <h1 style={{
          fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
          fontSize: "clamp(2rem, 10vw, 2.8rem)",
          color: "#f0ebe0",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: "normal",
          margin: 0,
          opacity: animate ? undefined : 0,
          animation: animate ? "slideR 0.95s cubic-bezier(0.25,0,0.35,1) 0.28s both" : "none",
        }}>
          Pathum
        </h1>

        {/* INVITE YOU TO THEIR WEDDING */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          color: "#6b6458",
          textTransform: "uppercase",
          marginTop: "1.4rem",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeUp 1s ease 0.45s both" : "none",
        }}>
          Invite you to their wedding
        </p>

        {/* Gold rule */}
        <div style={{
          width: "5rem",
          height: "1px",
          background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
          margin: "1.4rem 0 1.2rem",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeIn 1s ease 0.55s both" : "none",
        }} />

        {/* Venue + Time row */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          color: "#8a8070",
          textTransform: "uppercase",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeUp 1s ease 0.6s both" : "none",
        }}>
          Vinrich Lake Resort &nbsp;|&nbsp; at 4:00 pm
        </p>

        {/* Date block */}
        <div style={{
          marginTop: "1.2rem",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeUp 1s ease 0.68s both" : "none",
        }}>
          <p style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.62rem",
            letterSpacing: "0.45em",
            color: "#c9a96e",
            textTransform: "uppercase",
            marginBottom: "0",
          }}>
            June
          </p>

          {/* Falling petals behind the date */}
          <div style={{ position: "relative", display: "inline-block" }}>
            {[
              { left: "5%",  delay: "0s",   dur: "3.2s" },
              { left: "25%", delay: "0.8s", dur: "2.9s" },
              { left: "50%", delay: "1.5s", dur: "3.5s" },
              { left: "70%", delay: "0.4s", dur: "3.0s" },
              { left: "88%", delay: "1.1s", dur: "2.7s" },
            ].map((f, i) => (
              <span key={i} style={{
                position: "absolute",
                top: 0,
                left: f.left,
                fontSize: 8,
                opacity: 0,
                color: "#c9a96e",
                animation: `flowerFall ${f.dur} ease-in ${f.delay} infinite`,
                pointerEvents: "none",
                userSelect: "none",
              }}>✿</span>
            ))}
            <p style={{
              fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
              fontSize: "clamp(4.5rem, 24vw, 7rem)",
              color: "#f0ebe0",
              lineHeight: 0.82,
              margin: "0",
            }}>
              4
            </p>
          </div>

          <p style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.62rem",
            letterSpacing: "0.45em",
            color: "#c9a96e",
            marginTop: "0.2rem",
          }}>
            2026
          </p>
        </div>

        {/* Gold rule */}
        <div style={{
          width: "4rem",
          height: "1px",
          background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
          margin: "1.4rem 0 1rem",
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeIn 1s ease 0.8s both" : "none",
        }} />

        {/* Address */}
        <p style={{
          fontFamily: "var(--font-oranienbaum), serif",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          color: "#6b6458",
          textTransform: "uppercase",
          lineHeight: 2,
          opacity: animate ? undefined : 0,
          animation: animate ? "fadeUp 1s ease 0.85s both" : "none",
        }}>
          Riverbank Chateau Hall<br />
          Piliyandala
        </p>
      </div>
    </section>
  );
}
