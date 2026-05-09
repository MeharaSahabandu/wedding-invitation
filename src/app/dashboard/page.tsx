import { prisma } from "@/lib/prisma";
import ParticipantList from "./ParticipantList";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const guests = await prisma.guest.findMany({ orderBy: { createdAt: "asc" } });

  const confirmed = guests.filter((g) => g.attending === true).length;
  const pending = guests.filter((g) => g.attending === null).length;
  const notComing = guests.filter((g) => g.attending === false).length;
  const total = guests.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="leading-tight">
            <p className="font-black text-sm tracking-widest">PANTORA</p>
            <p className="text-[10px] text-gray-400 tracking-widest">
              EVENT PARTNERS
            </p>
          </div>
          {/* Nav links */}
          <div className="flex items-center gap-1">
            <NavLink icon={<HomeIcon />} label="Home" />
            <NavLink icon={<HeartIcon />} label="All Events" />
            <NavLink icon={<SettingsIcon />} label="Settings" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-5 text-sm text-gray-600">
          <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
            <ProfileIcon />
            Profile
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
            <SignOutIcon />
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="flex gap-6 p-6 max-w-screen-xl mx-auto">
        {/* ── Left panel — event card ── */}
        <div className="w-80 shrink-0 space-y-0">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Poster */}
            <div className="relative">
              <div
                className="h-64 flex flex-col items-start justify-end p-6"
                style={{
                  background:
                    "linear-gradient(160deg, #7a1212 0%, #1a0505 100%)",
                }}
              >
                {/* Decorative circles */}
                <div className="absolute top-8 right-8 w-28 h-28 rounded-full border border-white/10" />
                <div className="absolute top-14 right-14 w-16 h-16 rounded-full border border-white/10" />
                <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">
                  Wedding Invitation
                </p>
                <p
                  className="text-white font-black leading-none"
                  style={{ fontSize: "52px", letterSpacing: "-2px" }}
                >
                  wed
                </p>
                <p
                  className="text-white font-black leading-none"
                  style={{ fontSize: "52px", letterSpacing: "-2px" }}
                >
                  ding
                </p>
              </div>
              <button className="absolute bottom-4 right-4 bg-white text-gray-800 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow hover:shadow-md transition-shadow">
                <PencilIcon size={12} />
                Edit Poster
              </button>
            </div>

            {/* Event details */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-bold text-gray-900 text-lg">
                  Kumari &amp; Roshan
                </h2>
                <button className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5">
                  <PencilIcon size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                We joyfully invite you to celebrate the beginning of our new
                chapter. Join us for an evening of love, laughter, and timeless
                memories as we unite in marriage.
              </p>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <PencilIcon size={14} />
              </button>

              <hr className="border-gray-100 my-4" />

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
                    <CalendarIcon />
                    <span className="text-xs">04 June, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
                    <ClockIcon />
                    <span className="text-xs">18.00 – 23.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <LocationIcon />
                  <span className="text-xs">
                    Grand Ballroom, Cinnamon Grand
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 space-y-4">
          {/* Stats row */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-0">
            <div className="flex-1 flex gap-8 items-end">
              <StatBlock
                value={confirmed}
                label="Confirmed"
                labelColor="text-green-600 bg-green-50"
              />
              <StatBlock
                value={pending}
                label="Pending"
                labelColor="text-yellow-600 bg-yellow-50"
              />
              <StatBlock
                value={notComing}
                label="Not Coming"
                labelColor="text-red-600 bg-red-50"
              />
              <StatBlock
                value={total}
                label="Invitees"
                labelColor="text-gray-500 bg-gray-100"
              />
            </div>

            {/* Send Reminder */}
            <div className="border border-gray-100 rounded-xl p-4 ml-6 min-w-[180px]">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-3">
                <BellIcon />
                Send Reminder
              </button>
              <p className="text-[11px] text-gray-400 leading-snug mb-1">
                Automatic reminder set to send:
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-gray-500 underline cursor-pointer">
                  24 Hours before event
                </span>
                <PencilIcon size={10} />
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-lg">
                Event Participants
              </h2>
              <div className="flex items-center gap-2">
                <ActionButton icon={<DiamondIcon />} label="Add Manual" />
                <ActionButton icon={<UploadIcon />} label="Import" />
                <ActionButton icon={<LinkIcon />} label="Get Link" />
              </div>
            </div>

            <ParticipantList guests={guests} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small components ── */

function StatBlock({
  value,
  label,
  labelColor,
}: {
  value: number;
  label: string;
  labelColor: string;
}) {
  return (
    <div className="text-center">
      <p className="text-5xl font-bold text-gray-900 tabular-nums">
        {String(value).padStart(2, "0")}
      </p>
      <span
        className={`inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${labelColor}`}
      >
        {label}
      </span>
    </div>
  );
}

function NavLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
      {icon}
      {label}
    </button>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
      {icon}
      {label}
    </button>
  );
}

/* ── SVG Icons ── */

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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
