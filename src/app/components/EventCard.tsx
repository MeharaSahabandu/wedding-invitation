"use client";
import Link from "next/link";

type Props = {
  href: string;
  confirmed: number;
  pending: number;
  notComing: number;
};

export default function EventCard({ href, confirmed, pending, notComing }: Props) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex hover:shadow-md transition-shadow relative">
        <div className="w-[240px] shrink-0 relative flex flex-col items-start justify-end p-5" style={{background:"linear-gradient(160deg,#7a1212 0%,#1a0505 100%)"}}>
          <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-white/10"/>
          <div className="absolute top-12 right-12 w-14 h-14 rounded-full border border-white/10"/>
          <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1 z-10">Wedding</p>
          <p className="text-white font-black leading-none z-10" style={{fontSize:"44px",letterSpacing:"-2px"}}>wed</p>
          <p className="text-white font-black leading-none z-10" style={{fontSize:"44px",letterSpacing:"-2px"}}>ding</p>
        </div>
        <div className="flex-1 px-7 py-6 flex flex-col">
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414A2 2 0 019.586 13.414L9 13z"/>
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Prathibha &amp; Pathum</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
            We joyfully invite you to celebrate the beginning of our new chapter. Join us for an exclusive evening that bridges love and togetherness ...
          </p>
          <div className="flex items-center gap-6 mb-2">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span className="text-sm">04 June, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span className="text-sm">16.00 – 23.00</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-auto">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span className="text-sm">Grand Ballroom, Cinnamon Grand</span>
          </div>
          <div className="flex items-center gap-5 pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"/><span className="text-sm text-gray-600">Confirmed - {confirmed}</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400"/><span className="text-sm text-gray-600">Pending - {pending}</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"/><span className="text-sm text-gray-600">Not Coming - {notComing}</span></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
