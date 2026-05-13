import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CalendarWidget from "../components/CalendarWidget";
import EventCard from "../components/EventCard";
import MobileMenu from "../components/MobileMenu";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const guests = await prisma.guest.findMany();
  const confirmed = guests.filter((g) => g.attending === true).length;
  const notComing = guests.filter((g) => g.attending === false).length;
  const pending   = guests.filter((g) => g.attending === null).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-4 sm:px-8 py-3.5 flex items-center justify-between relative">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="leading-tight">
            <p className="font-black text-[15px] tracking-widest text-gray-900">
              PANT<span className="font-light">★</span>RA
            </p>
            <p className="text-[9px] text-gray-400 tracking-[0.25em] uppercase">Event Partners</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/home"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white font-medium bg-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/>
              </svg>
              Home
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              All Events
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MobileMenu />
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-screen-xl mx-auto items-start">
        {/* Left sidebar */}
        <div className="w-full lg:w-[280px] shrink-0 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Event..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm"
            />
          </div>

          <CalendarWidget eventDates={["2026-06-04"]} />

          <div className="flex gap-3">
            <div
              className="flex-1 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]"
              style={{ background: "linear-gradient(160deg,#7a1212 0%,#3b0000 60%,#1a0505 100%)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-black text-base leading-tight">Pantora</p>
                  <p className="text-white font-black text-base leading-tight">Plus Plan</p>
                </div>
                <span className="text-white/70 text-lg">✦</span>
              </div>
              <p className="text-white/50 text-[10px] leading-relaxed my-2">
                Get more features and see more analysis for all your events
              </p>
              <button className="bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm flex flex-col">
              <p className="text-xs font-semibold text-gray-700">Events Summary</p>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs text-gray-300 text-center">No data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Up Coming Events</h1>
            <button className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
              Create Event
            </button>
          </div>
          <div className="space-y-4">
            <EventCard
              href="/dashboard"
              confirmed={confirmed}
              pending={pending}
              notComing={notComing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
