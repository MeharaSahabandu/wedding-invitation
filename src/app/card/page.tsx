"use client";

import { useEffect, useState } from "react";
import CardOpener from "./_components/CardOpener";
import Hero from "./_components/Hero";
import Invitation from "./_components/Invitation";
import Venue from "./_components/Venue";
import Timeline from "./_components/Timeline";
import Details from "./_components/Details";
import RSVP from "./_components/RSVP";
import Countdown from "./_components/Countdown";
import MusicPlayer from "./_components/MusicPlayer";

export default function CardPage() {
  const [heroAnimate, setHeroAnimate] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ background: "#0d0d0d", minHeight: "100dvh" }}>
      <CardOpener onOpened={() => { setHeroAnimate(true); setMusicTrigger(true); }} />
      <MusicPlayer trigger={musicTrigger} />
      <Hero animate={heroAnimate} />
      <Invitation />
      <Venue />
      <Timeline />
      <Details />
      <RSVP />
      <Countdown />
    </main>
  );
}
