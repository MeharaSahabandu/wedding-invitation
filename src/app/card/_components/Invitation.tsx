import Image from "next/image";

export default function Invitation() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "720px" }}
    >
      {/* Top white fade — blends previous section into garden image */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: "240px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.5) 70%, transparent 100%)",
        }}
      />

      {/* Bottom white fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "200px",
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
        }}
      />

      {/* Background garden image — fills entire section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/garden.png"
          alt=""
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center px-8 pt-14"
        style={{ paddingBottom: "26rem" }}
      >
        {/* Heart icon */}
        <div className="w-28 mb-8">
          <Image
            src="/icons/heart.svg"
            alt=""
            width={112}
            height={40}
            className="w-full"
            style={{ filter: "sepia(60%) saturate(60%) hue-rotate(340deg)" }}
          />
        </div>

        {/* Invitation text */}
        <p
          className="text-center leading-relaxed text-lg"
          style={{
            fontFamily: "var(--font-oranienbaum), 'Oranienbaum', serif",
            color: "#92593a",
          }}
        >
          As we prepare to walk hand-in-hand into a new chapter of our lives, we
          find our greatest joy is in the people who have walked beside us along
          the way. Your love and friendship have shaped our story, and it would
          mean the world to us to have you there as we exchange our vows. Please
          join us for a day of laughter, love, and a celebration of the
          beautiful journey ahead
        </p>
      </div>
    </section>
  );
}
