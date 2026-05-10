import CardOpener from "./_components/CardOpener";
import Hero from "./_components/Hero";
import Invitation from "./_components/Invitation";
import Timeline from "./_components/Timeline";
import RSVP from "./_components/RSVP";

export default function CardPage() {
  return (
    <main>
      <CardOpener />
      <Hero />
      <Timeline />
      <Invitation />
      <RSVP />
    </main>
  );
}
