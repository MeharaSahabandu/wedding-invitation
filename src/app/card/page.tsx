"use client";

import { useEffect, useState } from "react";
import CardOpener from "./_components/CardOpener";
import Hero from "./_components/Hero";
import Invitation from "./_components/Invitation";
import Timeline from "./_components/Timeline";
import RSVP from "./_components/RSVP";

export default function CardPage() {
  const [heroAnimate, setHeroAnimate] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      style={{
        backgroundImage: "url('/images/bg-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100dvh",
      }}
    >
      <CardOpener onOpened={() => setHeroAnimate(true)} />
      <Hero animate={heroAnimate} />
      <Timeline />
      <Invitation />
      <RSVP />
    </main>
  );
}
