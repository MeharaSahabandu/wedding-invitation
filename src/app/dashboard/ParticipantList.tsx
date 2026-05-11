"use client";

import { useState } from "react";
import type { Guest } from "@prisma/client";

export default function ParticipantList({ guests }: { guests: Guest[] }) {
  const [query, setQuery] = useState("");

  const filtered = guests.filter((g) => {
    const q = query.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.phone.toLowerCase().includes(q)
    );
  });

  function statusConfig(attending: boolean | null) {
    if (attending === true)
      return {
        dot: "bg-green-500",
        text: "Confirmed",
        textClass: "text-green-600",
      };
    if (attending === false)
      return {
        dot: "bg-red-500",
        text: "Not Coming",
        textClass: "text-red-500",
      };
    return {
      dot: "bg-yellow-400",
      text: "Pending",
      textClass: "text-yellow-600",
    };
  }

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Invitee"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Participant rows */}
      <div className="divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            No participants found.
          </p>
        ) : (
          filtered.map((guest) => {
            const { dot, text, textClass } = statusConfig(guest.attending);
            return (
              <div
                key={guest.id}
                className="flex items-center justify-between py-4 gap-4"
              >
                {/* Left: name + contact */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug truncate">
                    {guest.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {guest.phone}
                  </p>
                </div>

                {/* Right: status */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className={`text-sm font-medium ${textClass}`}>
                    {text}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
