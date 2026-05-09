import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RSVPButtons from "./RSVPButtons";

export default async function InvitePage({
  params,
}: {
  params: { slug: string };
}) {
  const guest = await prisma.guest.findUnique({
    where: { slug: params.slug },
  });

  if (!guest) notFound();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f4f0" }}>
      {/* Header — matches the red gradient style from the design */}
      <header
        className="w-full py-6 px-10 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #8B1A1A 0%, #5C0A0A 100%)",
        }}
      >
        <div>
          <p className="text-white/60 text-xs tracking-widest uppercase">
            Wedding Invitation
          </p>
          <p className="text-white font-serif text-lg tracking-wide">
            Kumari &amp; Roshan
          </p>
        </div>
        <div className="text-white/70 text-sm">
          {new Date().getFullYear()}
        </div>
      </header>

      {/* Greeting */}
      <div className="px-10 pt-10 pb-4">
        <h2 className="text-2xl font-serif text-gray-800">
          Hi {guest.name}!
        </h2>
      </div>

      {/* Invitation Card */}
      <div className="mx-6 mb-10 rounded-2xl shadow-md bg-white overflow-hidden flex flex-col md:flex-row">
        {/* Left — details */}
        <div className="flex-1 p-10">
          <h1 className="text-5xl font-serif text-gray-900 mb-6 leading-tight">
            Our Wedding
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
            We joyfully invite you to celebrate the beginning of our new
            chapter. Join us for an evening of love, laughter, and timeless
            memories as we unite in marriage.
          </p>

          <hr className="border-gray-100 mb-8" />

          <div className="flex flex-wrap gap-8 mb-8 text-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-xl">📅</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
                <p className="font-medium">15 August, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🕕</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Time</p>
                <p className="font-medium">18.00 – 23.00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Venue</p>
                <p className="font-medium">Grand Ballroom, Cinnamon Grand</p>
              </div>
            </div>
          </div>

          {/* Already responded */}
          {guest.attending !== null && guest.attending !== undefined ? (
            <div
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium ${
                guest.attending
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {guest.attending ? "✓ You confirmed attendance" : "✗ You declined"}
            </div>
          ) : (
            <RSVPButtons slug={guest.slug} />
          )}
        </div>

        {/* Right — decorative panel */}
        <div
          className="hidden md:flex w-72 items-center justify-center"
          style={{
            background: "linear-gradient(160deg, #8B1A1A 0%, #3a0808 100%)",
          }}
        >
          <div className="text-center text-white p-8">
            <p className="text-6xl mb-4">💍</p>
            <p className="font-serif text-2xl mb-1">Kumari</p>
            <p className="text-white/50 text-sm mb-1">&amp;</p>
            <p className="font-serif text-2xl mb-6">Roshan</p>
            <div className="border-t border-white/20 pt-4 text-white/60 text-xs tracking-widest uppercase">
              August 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
