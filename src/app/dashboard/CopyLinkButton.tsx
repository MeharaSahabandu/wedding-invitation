"use client";

export default function CopyLinkButton({ rsvpLink }: { rsvpLink: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(rsvpLink);
        alert("RSVP link copied!\n\n" + rsvpLink);
      }}
      className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      Get Link
    </button>
  );
}
