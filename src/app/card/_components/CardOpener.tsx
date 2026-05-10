"use client";

import Image from "next/image";
import { useState } from "react";

export default function CardOpener() {
  const [opened, setOpened] = useState(false);
  const [unmount, setUnmount] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setUnmount(true), 950);
  };

  if (unmount) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex cursor-pointer select-none"
      onClick={handleOpen}
    >
      {/* Right panel — right half */}
      <div
        className="absolute inset-y-0 right-0 z-0"
        style={{
          width: "50%",
          transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
          transform: opened ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <Image
          src="/images/rightcard.png"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "left center" }}
          priority
        />
      </div>

      {/* Left panel — left half, on top */}
      <div
        className="absolute inset-y-0 left-0 z-10"
        style={{
          width: "90%",
          transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
          transform: opened ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <Image
          src="/images/leftcard.png"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "right center" }}
          priority
        />
      </div>

      {/* Tap to open hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-30"
        style={{
          transition: "opacity 0.25s ease",
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
  );
}
