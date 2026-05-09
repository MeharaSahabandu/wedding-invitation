export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-gray-700 mb-2">Wedding Invitation</h1>
        <p className="text-gray-500 text-sm">
          Use your personal invitation link to RSVP.
        </p>
        <p className="text-gray-400 text-xs mt-4">
          Example: <span className="font-mono">/invite/mehara</span>
        </p>
      </div>
    </main>
  );
}
