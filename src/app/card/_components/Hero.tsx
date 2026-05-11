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
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes dateNumIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Couple photo — top 50% of page only, showing bottom half of photo */}
      <div
        className="absolute left-0 right-0 top-0 z-0 overflow-hidden"
        style={{ height: "50%" }}
      >
        <Image
          src="/images/couple.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.45, objectPosition: "center bottom" }}
          priority
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/bg-pattern.png";
            (e.target as HTMLImageElement).style.opacity = "0.05";
          }}
        />
        {/* Fade edges so photo blends into dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.85) 85%, #0d0d0d 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,13,13,0.4) 0%, transparent 25%, transparent 75%, rgba(13,13,13,0.4) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8 py-14 w-full"
        style={{ maxWidth: "min(420px, 100vw)" }}
      >
        {/* YOU HAVE AN INVITATION FROM */}
        <p
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            fontSize: "0.58rem",
            letterSpacing: "0.32em",
            color: "#c9a96e",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeUp 1s ease 0.15s both" : "none",
          }}
        >
          Together with their families
        </p>

        {/* PRATHIBA — large Mea Culpa script */}
        <h1
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(4rem, 22vw, 6rem)",
            color: "#f0ebe0",
            lineHeight: 0.85,
            fontWeight: "normal",
            margin: 0,
            opacity: animate ? undefined : 0,
            animation: animate
              ? "slideL 0.95s cubic-bezier(0.25,0,0.35,1) 0.2s both"
              : "none",
          }}
        >
          Prathibha
        </h1>

        {/* and */}
        <p
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
            color: "#c9a96e",
            margin: "0.1rem 0",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeIn 1s ease 0.3s both" : "none",
          }}
        >
          and
        </p>

        {/* PATHUM — same Mea Culpa script as Prathiba */}
        <h1
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(4rem, 22vw, 6rem)",
            color: "#f0ebe0",
            lineHeight: 0.85,
            fontWeight: "normal",
            margin: 0,
            opacity: animate ? undefined : 0,
            animation: animate
              ? "slideR 0.95s cubic-bezier(0.25,0,0.35,1) 0.28s both"
              : "none",
          }}
        >
          Pathum
        </h1>

        {/* INVITE YOU TO THEIR WEDDING */}
        <p
          style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            color: "#6b6458",
            textTransform: "uppercase",
            marginTop: "1.4rem",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeUp 1s ease 0.45s both" : "none",
          }}
        >
          Invite you to their wedding
        </p>

        {/* Gold rule */}
        <div
          style={{
            width: "5rem",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #c9a96e, transparent)",
            margin: "1.4rem 0 1.2rem",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeIn 1s ease 0.55s both" : "none",
          }}
        />

        {/* Venue name */}
        <p
          style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            color: "#8a8070",
            textTransform: "uppercase",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeUp 1s ease 0.6s both" : "none",
          }}
        >
          Vinrich Lake Resort
        </p>

        {/* Date block */}
        <div
          style={{
            width: "100%",
            maxWidth: "300px",
            marginTop: "1.4rem",
          }}
        >
          {/* JUNE */}
          <p
            style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.65rem",
              letterSpacing: "0.55em",
              color: "#c9a96e",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "0.55rem",
              opacity: animate ? undefined : 0,
              animation: animate ? "fadeUp 0.8s ease 0.65s both" : "none",
            }}
          >
            June
          </p>

          {/* Top border line — expands from center */}
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "1px",
                background: "rgba(201,169,110,0.55)",
                width: animate ? undefined : "0%",
                animation: animate ? "lineExpand 0.8s ease 0.75s both" : "none",
                alignSelf: "stretch",
                flexShrink: 0,
                minWidth: "100%",
              }}
            />
          </div>

          {/* Day row: THURSDAY | 4 | AT 4:00 PM */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.3rem 0.8rem",
              gap: "0.4rem",
            }}
          >
            {/* Day name */}
            <span
              style={{
                fontFamily: "var(--font-oranienbaum), serif",
                fontSize: "clamp(0.5rem, 2vw, 0.6rem)",
                letterSpacing: "0.2em",
                color: "#8a8070",
                textTransform: "uppercase",
                opacity: animate ? undefined : 0,
                animation: animate ? "fadeUp 0.8s ease 0.82s both" : "none",
                flexShrink: 0,
              }}
            >
              Thursday
            </span>

            {/* Vertical divider */}
            <div
              style={{
                width: "1px",
                height: "2.4rem",
                background: "rgba(201,169,110,0.4)",
                flexShrink: 0,
                opacity: animate ? undefined : 0,
                animation: animate ? "fadeIn 0.6s ease 0.9s both" : "none",
              }}
            />

            {/* Large day number */}
            <span
              style={{
                fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                fontSize: "clamp(2.8rem, 14vw, 4rem)",
                color: "#f0ebe0",
                lineHeight: 1,
                opacity: animate ? undefined : 0,
                animation: animate
                  ? "dateNumIn 0.7s cubic-bezier(0.25,0,0.35,1) 0.78s both"
                  : "none",
                flexShrink: 0,
              }}
            >
              4
            </span>

            {/* Vertical divider */}
            <div
              style={{
                width: "1px",
                height: "2.4rem",
                background: "rgba(201,169,110,0.4)",
                flexShrink: 0,
                opacity: animate ? undefined : 0,
                animation: animate ? "fadeIn 0.6s ease 0.9s both" : "none",
              }}
            />

            {/* Time */}
            <span
              style={{
                fontFamily: "var(--font-oranienbaum), serif",
                fontSize: "clamp(0.5rem, 2vw, 0.6rem)",
                letterSpacing: "0.2em",
                color: "#8a8070",
                textTransform: "uppercase",
                opacity: animate ? undefined : 0,
                animation: animate ? "fadeUp 0.8s ease 0.82s both" : "none",
                flexShrink: 0,
              }}
            >
              At 4:00 pm
            </span>
          </div>

          {/* Bottom border line */}
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "1px",
                background: "rgba(201,169,110,0.55)",
                width: animate ? undefined : "0%",
                animation: animate ? "lineExpand 0.8s ease 0.75s both" : "none",
                alignSelf: "stretch",
                flexShrink: 0,
                minWidth: "100%",
              }}
            />
          </div>

          {/* 2026 */}
          <p
            style={{
              fontFamily: "var(--font-oranienbaum), serif",
              fontSize: "0.65rem",
              letterSpacing: "0.55em",
              color: "#c9a96e",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: "0.55rem",
              opacity: animate ? undefined : 0,
              animation: animate ? "fadeUp 0.8s ease 0.9s both" : "none",
            }}
          >
            2026
          </p>
        </div>

        {/* Gold rule */}
        <div
          style={{
            width: "4rem",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #c9a96e, transparent)",
            margin: "1.4rem 0 1rem",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeIn 1s ease 0.8s both" : "none",
          }}
        />

        {/* Address */}
        <p
          style={{
            fontFamily: "var(--font-oranienbaum), serif",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "#6b6458",
            textTransform: "uppercase",
            lineHeight: 2,
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeUp 1s ease 0.85s both" : "none",
          }}
        >
          Riverbank Chateau Hall
          <br />
          Piliyandala
        </p>
      </div>
    </section>
  );
}
