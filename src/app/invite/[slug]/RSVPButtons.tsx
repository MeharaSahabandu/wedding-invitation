"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RSVPButtons({ slug }: { slug: string }) {
  const [loading, setLoading] = useState<"yes" | "no" | null>(null);
  const router = useRouter();

  async function respond(attending: boolean) {
    setLoading(attending ? "yes" : "no");
    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, attending }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => respond(true)}
        disabled={!!loading}
        className="px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-medium
          hover:bg-gray-700 disabled:opacity-50 transition-all"
      >
        {loading === "yes" ? "Saving…" : "Confirm Attendance ✓"}
      </button>
      <button
        onClick={() => respond(false)}
        disabled={!!loading}
        className="px-8 py-3 rounded-full bg-gray-100 text-gray-600 text-sm font-medium
          hover:bg-gray-200 disabled:opacity-50 transition-all"
      >
        {loading === "no" ? "Saving…" : "Not Attending"}
      </button>
    </div>
  );
}
