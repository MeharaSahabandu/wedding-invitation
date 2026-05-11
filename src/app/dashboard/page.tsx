import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ParticipantList from "./ParticipantList";
import ImportButton from "./ImportButton";
import LogoutButton from "../components/LogoutButton";
import MobileMenu from "../components/MobileMenu";
import CopyLinkButton from "./CopyLinkButton";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const guests = await prisma.guest.findMany({
    where: { OR: [{ userId: session.userId }, { userId: null }] },
    orderBy: { createdAt: "asc" },
  });

  const confirmed = guests.filter((g) => g.attending === true).length;
  const notComing = guests.filter((g) => g.attending === false).length;
  const pending = guests.filter((g) => g.attending === null).length;
  const total = guests.length;
  const rsvpLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/rsvp`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-4 sm:px-8 py-3.5 flex items-center justify-between relative">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <div className="leading-tight">
            <p className="font-black text-[15px] tracking-widest text-gray-900">
              PANT<span className="font-light">★</span>RA
            </p>
            <p className="text-[9px] text-gray-400 tracking-[0.25em] uppercase">
              Event Partners
            </p>
          </div>

          {/* Nav pills — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink icon={<HomeIcon />} label="Home" href="/" />
            <NavLink icon={<HeartIcon />} label="All Events" />
            <NavLink icon={<SettingsIcon />} label="Settings" />
          </div>
        </div>

        {/* Right: Profile | Sign Out */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 hover:text-gray-900 transition-colors">
            <ProfileIcon />
            Profile
          </button>
          <span className="hidden sm:block text-gray-300 select-none mx-1">|</span>
          <div className="hidden sm:block"><LogoutButton /></div>
          <MobileMenu />
        </div>
      </nav>

      {/* ── Page body ── */}
      <div className="flex flex-col lg:flex-row gap-5 p-4 sm:p-6 max-w-screen-xl mx-auto items-start">
        {/* ── Left panel ── */}
        <div className="w-full lg:w-[450px] shrink-0">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Poster image */}
            <div className="relative">
              <div className="w-full overflow-hidden">
                <img
                  src="/newPic.jpeg"
                  alt="Event poster"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Event details */}
            <div className="px-6 pt-5 pb-6">
              {/* Title row */}
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-bold text-gray-900 text-xl leading-tight">
                  Prathibha &amp; Pathum
                </h2>
                <button className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 shrink-0 ml-3">
                  <PencilIcon size={15} />
                </button>
              </div>

              {/* Description */}
              <div className="flex items-end justify-between gap-3 mb-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  We joyfully invite you to celebrate the beginning of our new
                  chapter. Join us for an evening of love, laughter, and
                  timeless memories as we unite in marriage.
                </p>
                <button className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 mb-0.5">
                  <PencilIcon size={14} />
                </button>
              </div>

              <hr className="border-gray-100 mb-4" />

              {/* Date + Time side by side with divider */}
              <div className="flex items-center gap-0 mb-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 flex-1">
                  <CalendarIcon />
                  <span className="text-xs text-gray-700">04 June, 2026</span>
                </div>
                <div className="w-px h-8 bg-gray-200 mx-2 shrink-0" />
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 flex-1">
                  <ClockIcon />
                  <span className="text-xs text-gray-700">16.00 – 23.00</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                <LocationIcon />
                <span className="text-xs text-gray-700">
                  Vinrich Lake Resort, Riverbank Chateau Hall, Piliyandala
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 space-y-4 min-w-0">
          {/* Stats card */}
          <div className="bg-white rounded-2xl shadow-sm px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden">
            {/* 4 stat blocks */}
            <div className="grid grid-cols-4 sm:flex sm:items-end gap-3 sm:gap-6 flex-1 w-full min-w-0">
              <StatBlock
                value={confirmed}
                label="Confirmed"
                badgeClass="text-green-600 bg-green-50"
              />
              <StatBlock
                value={pending}
                label="Pending"
                badgeClass="text-yellow-600 bg-yellow-50"
              />
              <StatBlock
                value={notComing}
                label="Not Coming"
                badgeClass="text-red-500 bg-red-50"
              />
              <StatBlock
                value={total}
                label="Invitees"
                badgeClass="text-gray-500 bg-gray-100"
              />
            </div>

            {/* Send Reminder section */}
            <div
              className="border rounded-xl p-4 w-full sm:w-[200px] sm:shrink-0"
              style={{ borderColor: "#e8e8e8" }}
            >
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors mb-3 border border-gray-200 rounded-full px-4 py-2 w-full justify-center">
                <BellIcon />
                Send Reminder
              </button>
              <p className="text-[11px] text-gray-400 leading-snug mb-1.5">
                Automatic reminder set to send:
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-gray-600 underline cursor-pointer hover:text-gray-900 transition-colors">
                  24 Hours before event
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <PencilIcon size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Participants card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h2 className="font-bold text-gray-900 text-xl">
                Event Participants
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <ActionButton icon={<DiamondIcon />} label="Add Manual" />
                <ImportButton />
                <CopyLinkButton rsvpLink={rsvpLink} />
              </div>
            </div>

            <ParticipantList guests={guests} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stat block ── */
function StatBlock({
  value,
  label,
  badgeClass,
}: {
  value: number;
  label: string;
  badgeClass: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[36px] sm:text-[56px] font-bold text-gray-900 tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </p>
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Nav link pill ── */
function NavLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const cls =
    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors";
  if (href)
    return (
      <Link href={href} className={cls}>
        {icon}
        {label}
      </Link>
    );
  return (
    <button className={cls}>
      {icon}
      {label}
    </button>
  );
}

/* ── Action button ── */
function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
      {icon}
      {label}
    </button>
  );
}

/* ── Icons ── */
function HomeIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
      />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="3" strokeWidth="1.5" />
      <path
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M6.168 18.849A4.008 4.008 0 0110 16h4a4.008 4.008 0 013.832 2.849"
      />
    </svg>
  );
}
function SignOutIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
function PencilIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414A2 2 0 019.586 13.414L9 13z"
      />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function DiamondIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 3l9 9-9 9-9-9 9-9z"
      />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}
