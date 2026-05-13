"use client";

import { useEffect, useRef, useState } from "react";
import CardOpener from "./_components/CardOpener";
import Hero from "./_components/Hero";
import Invitation from "./_components/Invitation";
import Venue from "./_components/Venue";
import Timeline from "./_components/Timeline";
import RSVP from "./_components/RSVP";
import Countdown from "./_components/Countdown";

export default function CardPage() {
  const [heroAnimate, setHeroAnimate] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, []);

  function fadeIn(audio: HTMLAudioElement) {
    let vol = 0;
    const step = () => {
      vol = Math.min(vol + 0.02, 0.55);
      audio.volume = vol;
      if (vol < 0.55) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function startMusic() {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        setPlaying(true);
        fadeIn(audioRef.current!);
      })
      .catch(() => {});
  }

  function toggleMusic() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <main style={{ background: "#0d0d0d", minHeight: "100dvh" }}>
      <audio ref={audioRef} src="/audio/background.mp3" onEnded={() => setPlaying(false)} suppressHydrationWarning />
      <CardOpener onOpened={() => { setHeroAnimate(true); startMusic(); }} />
      <Hero animate={heroAnimate} playing={playing} onMusicToggle={toggleMusic} audioRef={audioRef} />
      <Invitation />
      <Venue />
      <Timeline />
<RSVP />
      <Countdown />
    </main>
  );
}
