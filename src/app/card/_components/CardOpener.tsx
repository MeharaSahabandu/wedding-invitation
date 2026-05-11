"use client";

import Image from "next/image";
import { useState } from "react";

export default function CardOpener({ onOpened }: { onOpened?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [unmount, setUnmount] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      onOpened?.();
    }, 0);
    setTimeout(() => setUnmount(true), 2200);
  };

  if (unmount) return null;

  return (
    <>
      <style>{`
        @keyframes windowLeft {
          0%   { transform: translateY(-8%) rotateY(0deg); }
          100% { transform: translateY(-8%) rotateY(-120deg); }
        }
        @keyframes windowRight {
          0%   { transform: translateY(-8%) rotateY(0deg); }
          100% { transform: translateY(-8%) rotateY(120deg); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[100] cursor-pointer select-none"
        style={{ perspective: "1600px" }}
        onClick={handleOpen}
      >
        {/* Right panel — behind, hinged on right edge */}
        <div
          className="absolute inset-y-0 right-0 z-0"
          style={{
            width: "60%",
            transformOrigin: "right center",
            transform: "translateY(-8%)",
            animation: opened
              ? "windowRight 1.8s cubic-bezier(0.65, 0, 0.35, 1) 0.01s forwards"
              : "none",
          }}
        >
          <Image
            src="/images/rightcard.png"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "left 35%" }}
            priority
          />
        </div>

        {/* Left panel — on top, hinged on left edge, opens first */}
        <div
          className="absolute inset-y-0 left-0 z-10"
          style={{
            width: "75%",
            transformOrigin: "left center",
            transform: "translateY(-8%)",
            animation: opened
              ? "windowLeft 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards"
              : "none",
          }}
        >
          <Image
            src="/images/leftcard.png"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "left 35%" }}
            priority
          />
        </div>

        {/* Tap hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-30"
          style={{
            transition: "opacity 0.0001s ease",
            opacity: opened ? 0 : 1,
          }}
        >
          <p
            className="text-xs tracking-[0.28em] uppercase"
            style={{
              fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
              color: "rgba(100,55,10,0.45)",
            }}
          >
            tap to open
          </p>
        </div>
      </div>
    </>
  );
}
