"use client";

import { useState } from "react";

type Guest = {
  id: number;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  attending: boolean | null;
};

export default function ParticipantList({ guests }: { guests: Guest[] }) {
  const [query, setQuery] = useState("");

  const filtered = guests.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase()) ||
    (g.email ?? "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="relative mb-2">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search Invitee"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Guest rows */}
      <div className="divide-y divide-gray-100">
        {filtered.map((g) => (
          <div key={g.id} className="flex items-center justify-between py-4 px-1">
            <div>
              <p className="text-sm font-semibold text-gray-900">{g.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {g.email ?? "—"}{g.phone ? ` | ${g.phone}` : ""}
              </p>
            </div>
            <StatusBadge attending={g.attending} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 py-8 text-center">No results found</p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ attending }: { attending: boolean | null }) {
  if (attending === true)
    return (
      <span className="flex items-center gap-1.5 text-sm text-gray-700">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
        Confirmed
      </span>
    );
  if (attending === false)
    return (
      <span className="flex items-center gap-1.5 text-sm text-gray-700">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
        Not Coming
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-sm text-gray-700">
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
      Pending
    </span>
  );
}
