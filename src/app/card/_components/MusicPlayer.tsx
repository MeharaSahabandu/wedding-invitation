"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ trigger }: { trigger: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  /* Start music once the card opener is tapped */
  useEffect(() => {
    if (!trigger || !audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        setPlaying(true);
        fadeIn(audioRef.current!);
      })
      .catch(() => {
        /* autoplay blocked — button will still work */
      });
  }, [trigger]);

  function fadeIn(audio: HTMLAudioElement) {
    let vol = 0;
    const step = () => {
      vol = Math.min(vol + 0.02, 0.55);
      audio.volume = vol;
      if (vol < 0.55) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <style>{`
        @keyframes bar1 { 0%,100% { height: 4px; }  50% { height: 16px; } }
        @keyframes bar2 { 0%,100% { height: 12px; } 50% { height: 4px;  } }
        @keyframes bar3 { 0%,100% { height: 7px;  } 50% { height: 18px; } }
        @keyframes bar4 { 0%,100% { height: 14px; } 50% { height: 5px;  } }
        @keyframes bar5 { 0%,100% { height: 5px;  } 50% { height: 13px; } }
        @keyframes playerFadeIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/background.mp3"
        loop
        onCanPlayThrough={() => setReady(true)}
      />

      {/* Floating button — only show after card opener is tapped */}
      {trigger && (
        <button
          onClick={toggle}
          title={playing ? "Pause music" : "Play music"}
          style={{
            position: "fixed",
            bottom: "1.6rem",
            right: "1.4rem",
            zIndex: 200,
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "rgba(13,13,13,0.85)",
            border: "1px solid rgba(201,169,110,0.45)",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            animation: "playerFadeIn 0.6s ease both",
          }}
        >
          {playing ? (
            /* Animated equalizer bars */
            <div style={{ display: "flex", alignItems: "center", gap: "2.5px", height: "20px" }}>
              {[
                { anim: "bar1", dur: "0.7s", delay: "0s" },
                { anim: "bar2", dur: "0.6s", delay: "0.1s" },
                { anim: "bar3", dur: "0.8s", delay: "0.05s" },
                { anim: "bar4", dur: "0.65s", delay: "0.15s" },
                { anim: "bar5", dur: "0.75s", delay: "0.08s" },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    borderRadius: "2px",
                    background: "#c9a96e",
                    animation: `${b.anim} ${b.dur} ease-in-out ${b.delay} infinite`,
                  }}
                />
              ))}
            </div>
          ) : (
            /* Music note when paused */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18V6l12-2v12"
                stroke="rgba(201,169,110,0.7)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="rgba(201,169,110,0.7)" strokeWidth="1.8" />
              <circle cx="18" cy="16" r="3" stroke="rgba(201,169,110,0.7)" strokeWidth="1.8" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
