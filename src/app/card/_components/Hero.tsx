"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

const SLIDES = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"];

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Hero({
  animate = false,
  playing = false,
  onMusicToggle,
  audioRef,
}: {
  animate?: boolean;
  playing?: boolean;
  onMusicToggle?: () => void;
  audioRef?: RefObject<HTMLAudioElement>;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [slide, setSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [depth, setDepth] = useState({ rx: 0, tz: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    function onScroll() {
      if (window.innerWidth < 768) return;
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      setDepth({ rx: progress * 8, tz: Math.abs(progress) * -70 });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    if (audio.duration) setDuration(audio.duration);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, [audioRef]);

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef?.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroNameL {
          0%   { opacity: 0; transform: translateX(-50px) rotateY(-20deg); }
          100% { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }
        @keyframes heroNameR {
          0%   { opacity: 0; transform: translateX(50px) rotateY(20deg); }
          100% { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }
        @keyframes heroAndDrop {
          0%   { opacity: 0; transform: translateY(-20px) rotateX(30deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes dateNumIn {
          0%   { opacity: 0; transform: rotateX(-50deg) scale(0.7); }
          100% { opacity: 1; transform: rotateX(0deg) scale(1); }
        }
        @keyframes dateFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes playerFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes playPulse {
          0%,100% { box-shadow: 0 2px 12px rgba(201,169,110,0.25); }
          50%     { box-shadow: 0 2px 24px rgba(201,169,110,0.55); }
        }
        .prog-bar:hover .prog-thumb { opacity: 1 !important; }
        .prog-bar:hover .prog-fill  { background: #e8c87a !important; }
      `}</style>

      {/* Carousel — top 50% of page, infinite crossfade */}
      <div
        className="absolute left-0 right-0 top-0 z-0 overflow-hidden"
        style={{ height: "50%" }}
      >
        {mounted && SLIDES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className="object-cover"
            style={{
              objectPosition: "center bottom",
              opacity: i === slide ? 0.38 : 0,
              transition: "opacity 1.4s ease-in-out",
            }}
            priority={i === 0}
          />
        ))}
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
        className="relative z-10 flex flex-col items-center text-center px-8 pt-14 pb-6 w-full"
        style={{
          maxWidth: "min(420px, 100vw)",
          transform: `perspective(1100px) rotateX(${depth.rx}deg) translateZ(${depth.tz}px)`,
          willChange: "transform",
        }}
      >
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
              ? "heroNameL 2.8s cubic-bezier(0.16,1,0.3,1) 0.2s both"
              : "none",
          }}
        >
          Prathibha
        </h1>

        <p
          style={{
            fontFamily: "var(--font-mea), 'Mea Culpa', cursive",
            fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
            color: "#c9a96e",
            margin: "0.1rem 0",
            opacity: animate ? undefined : 0,
            animation: animate ? "heroAndDrop 1.6s cubic-bezier(0.16,1,0.3,1) 0.55s both" : "none",
          }}
        >
          and
        </p>

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
              ? "heroNameR 2.8s cubic-bezier(0.16,1,0.3,1) 0.35s both"
              : "none",
          }}
        >
          Pathum
        </h1>

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
            background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
            margin: "1.4rem 0 1.2rem",
            opacity: animate ? undefined : 0,
            animation: animate ? "fadeIn 1s ease 0.55s both" : "none",
          }}
        />

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
        <div style={{ width: "100%", maxWidth: "300px", marginTop: "1.4rem" }}>
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

          <div style={{ overflow: "hidden", display: "flex", justifyContent: "center" }}>
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.3rem 0.8rem",
              gap: "0.4rem",
            }}
          >
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
            <span
              style={{
                fontFamily: "var(--font-cinzel), 'Cinzel Decorative', serif",
                fontSize: "clamp(2.8rem, 14vw, 4rem)",
                color: "#f0ebe0",
                lineHeight: 1,
                opacity: animate ? undefined : 0,
                animation: animate
                  ? "dateNumIn 1.6s cubic-bezier(0.16,1,0.3,1) 0.78s both, dateFloat 4s ease-in-out 3s infinite"
                  : "none",
                flexShrink: 0,
              }}
            >
              4
            </span>
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

          <div style={{ overflow: "hidden", display: "flex", justifyContent: "center" }}>
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
            background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
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

        {/* Spotify-style player bar */}
        {animate && (
          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              marginTop: "2.4rem",
              opacity: 0,
              animation: "playerFadeIn 1.2s ease 1.4s both",
            }}
          >
            {/* Controls row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.6rem",
                marginBottom: "1rem",
              }}
            >
              {/* Skip back — decorative */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                <polygon points="19,5 9,12 19,19" fill="rgba(201,169,110,0.8)" />
                <rect x="5" y="5" width="2.5" height="14" rx="1" fill="rgba(201,169,110,0.8)" />
              </svg>

              {/* Play / Pause */}
              <button
                onClick={onMusicToggle}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#f0ebe0",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 12px rgba(201,169,110,0.2)",
                  animation: "playPulse 2.5s ease-in-out infinite",
                }}
              >
                {playing ? (
                  /* Pause icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="4" width="4" height="16" rx="1.5" fill="#0d0d0d" />
                    <rect x="15" y="4" width="4" height="16" rx="1.5" fill="#0d0d0d" />
                  </svg>
                ) : (
                  /* Play icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polygon points="6,4 20,12 6,20" fill="#0d0d0d" />
                  </svg>
                )}
              </button>

              {/* Skip forward — decorative */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                <polygon points="5,5 15,12 5,19" fill="rgba(201,169,110,0.8)" />
                <rect x="16.5" y="5" width="2.5" height="14" rx="1" fill="rgba(201,169,110,0.8)" />
              </svg>
            </div>

            {/* Progress row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              {/* Elapsed */}
              <span
                style={{
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.55rem",
                  color: "rgba(201,169,110,0.6)",
                  letterSpacing: "0.05em",
                  minWidth: "2.4rem",
                  textAlign: "right",
                }}
              >
                {fmt(currentTime)}
              </span>

              {/* Track */}
              <div
                className="prog-bar"
                ref={progressRef}
                onClick={seek}
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "2px",
                  background: "rgba(201,169,110,0.18)",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Filled portion */}
                <div
                  className="prog-fill"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${progress}%`,
                    borderRadius: "2px",
                    background: "#c9a96e",
                    transition: "width 0.25s linear",
                  }}
                />
                {/* Thumb dot */}
                <div
                  className="prog-thumb"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: `${progress}%`,
                    transform: "translate(-50%, -50%)",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#f0ebe0",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                />
              </div>

              {/* Duration */}
              <span
                style={{
                  fontFamily: "var(--font-oranienbaum), serif",
                  fontSize: "0.55rem",
                  color: "rgba(201,169,110,0.35)",
                  letterSpacing: "0.05em",
                  minWidth: "2.4rem",
                }}
              >
                {fmt(duration)}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
