"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleLogin() {
    if (!identifier.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: identifier.trim(), password: password.trim() }) });
    if (res.ok) { router.push("/"); } else { const data = await res.json(); setError(data.error ?? "Invalid credentials."); setLoading(false); }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "linear-gradient(160deg, #c41a1a 0%, #7f1d1d 35%, #3b0a0a 100%)" }}>
      <div className="mb-8 text-center">
        <p className="font-black text-white text-3xl tracking-widest">PANT<span className="font-light">★</span>RA</p>
        <p className="text-white/50 text-[10px] tracking-[0.35em] uppercase mt-1">Event Partners</p>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)" }}>
          <h1 className="text-white text-xl font-bold">Welcome back</h1>
          <p className="text-white/60 text-xs mt-1">Sign in to manage your events</p>
        </div>
        <div className="px-8 py-7 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Phone or Email</label>
            <input type="text" placeholder="Enter phone or email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} autoFocus className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 bg-gray-50" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 bg-gray-50" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button onClick={handleLogin} disabled={loading} className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-2" style={{ background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </div>
      <p className="text-white/30 text-xs mt-6">© 2026 Pantora Event Partners</p>
    </div>
  );
}
