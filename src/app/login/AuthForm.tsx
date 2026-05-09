"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";

export default function AuthForm() {
  const [mode, setMode]         = useState<Mode>("login");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "register" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (mode === "register" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
    setConfirm("");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 40%, #450a0a 100%)" }}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <p className="text-white font-black text-2xl tracking-widest">
          PANT<span className="font-light">★</span>RA
        </p>
        <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mt-1">
          Event Partners
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Card header */}
        <div
          className="px-8 py-6"
          style={{ background: "linear-gradient(135deg, #991b1b 0%, #450a0a 100%)" }}
        >
          <h1 className="text-white text-xl font-bold">
            {mode === "login" ? "Sign in to your account" : "Create an account"}
          </h1>
          <p className="text-white/60 text-xs mt-1">
            {mode === "login"
              ? "Manage your wedding invitations"
              : "Start managing your event today"}
          </p>
        </div>

        {/* Card body */}
        <div className="px-8 py-7 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          {/* Confirm password — register only */}
          {mode === "register" && (
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-white disabled:opacity-60 transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)" }}
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Sign In →"
              : "Create Account →"}
          </button>

          {/* Toggle */}
          <p className="text-center text-xs text-gray-400 pt-1">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => switchMode("register")}
                  className="text-red-700 font-medium hover:underline"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-red-700 font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      <p className="text-white/30 text-xs mt-8">
        Wedding Invitation &copy; 2026
      </p>
    </div>
  );
}
