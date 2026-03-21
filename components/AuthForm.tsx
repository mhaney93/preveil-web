"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: "https://preveil.shop/auth/callback" },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email to confirm your account.");
      }
    }

    setLoading(false);
  }

  const inputClass =
    "w-full bg-[var(--card)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder:text-[var(--muted)]";

  return (
    <div>
      <div className="flex gap-8 mb-10">
        <button
          onClick={() => setMode("login")}
          className={`text-sm tracking-widest uppercase transition-colors ${
            mode === "login" ? "text-[var(--foreground)]" : "text-[var(--muted)]"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`text-sm tracking-widest uppercase transition-colors ${
            mode === "signup" ? "text-[var(--foreground)]" : "text-[var(--muted)]"
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          key={mode}
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-[var(--accent-gold)] text-sm">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors disabled:opacity-50"
        >
          {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
