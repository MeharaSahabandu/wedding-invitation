import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const guests = await prisma.guest.findMany({ orderBy: { createdAt: "asc" } });

  const total = guests.length;
  const attending = guests.filter((g) => g.attending === true).length;
  const declined = guests.filter((g) => g.attending === false).length;
  const pending = guests.filter((g) => g.attending === null).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="w-full px-10 py-6"
        style={{
          background: "linear-gradient(135deg, #8B1A1A 0%, #5C0A0A 100%)",
        }}
      >
        <p className="text-white/60 text-xs tracking-widest uppercase mb-1">
          Organizer
        </p>
        <h1 className="text-white font-serif text-2xl">
          Kumari &amp; Roshan — Dashboard
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Invited" value={total} color="bg-gray-900" />
          <StatCard label="Attending" value={attending} color="bg-green-700" />
          <StatCard label="Not Attending" value={declined} color="bg-red-800" />
          <StatCard label="Pending" value={pending} color="bg-amber-600" />
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <p className="text-sm text-gray-500 mb-3">Response rate</p>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 bg-gray-900 rounded-full transition-all"
              style={{ width: total ? `${((total - pending) / total) * 100}%` : "0%" }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {total - pending} of {total} responded
          </p>
        </div>

        {/* Guest table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-medium text-gray-800">Guest List</h2>
            <span className="text-xs text-gray-400">{total} guests</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Invite Link</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Responded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {guests.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {g.name}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                    /invite/{g.slug}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge attending={g.attending} />
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {g.respondedAt
                      ? new Date(g.respondedAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`${color} text-white rounded-2xl p-5 shadow-sm`}>
      <p className="text-3xl font-serif mb-1">{value}</p>
      <p className="text-xs opacity-70 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function StatusBadge({ attending }: { attending: boolean | null }) {
  if (attending === true)
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        ✓ Attending
      </span>
    );
  if (attending === false)
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
        ✗ Declined
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
      ⏳ Pending
    </span>
  );
}
