"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [guestEmail, setGuestEmail] = useState<string | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Signup form state
  const [signupState, setSignupState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [claimedPoints, setClaimedPoints] = useState<number | null>(null);

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    if (!paymentIntentId) {
      setStatus("error");
      return;
    }

    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const data = await res.json();
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cart-updated"));
        setOrderId(data.orderId);
        setPointsEarned(data.pointsEarned ?? 0);

        // Only show signup prompt for guests
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user && data.email) {
          setGuestEmail(data.email);
        }

        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!guestEmail || !orderId) return;
    setSignupState("submitting");
    setSignupError(null);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: guestEmail,
      password,
    });

    if (signUpError) {
      setSignupError(signUpError.message);
      setSignupState("error");
      return;
    }

    // Sign in immediately so we have a session for claim-order
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: guestEmail,
      password,
    });

    if (signInError) {
      // Account created but couldn't sign in — still a partial success
      setClaimedPoints(pointsEarned);
      setSignupState("done");
      return;
    }

    // Claim the order and award points
    const claimRes = await fetch("/api/claim-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const claimData = claimRes.ok ? await claimRes.json() : null;
    setClaimedPoints(claimData?.pointsEarned ?? pointsEarned);
    setSignupState("done");
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      {status === "loading" && (
        <p className="text-[var(--muted)] tracking-widest uppercase text-sm">
          Confirming your order...
        </p>
      )}

      {status === "done" && (
        <>
          <p className="text-[var(--accent-gold)] text-sm tracking-[0.4em] uppercase mb-6">
            Order Confirmed
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl font-light tracking-wide text-[var(--foreground)] mb-6">
            Thank you
          </h1>
          <p className="text-[var(--muted)] leading-relaxed mb-12">
            Your order has been received and is being prepared. You will receive
            a confirmation email shortly.
          </p>

          {/* Optional guest signup prompt */}
          {guestEmail && signupState !== "done" && (
            <div className="border border-[var(--border)] px-8 py-8 mb-12 text-left">
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-3">
                Save your details
              </p>
              <p className="text-[var(--foreground)] text-sm leading-relaxed mb-6">
                Create a free account to track your orders and earn points on every purchase
                {pointsEarned > 0 ? ` — including ${pointsEarned} points from this order` : ""}.
              </p>
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div>
                  <p className="text-[var(--muted)] text-xs tracking-widest uppercase mb-1">Email</p>
                  <p className="text-[var(--foreground)] text-sm">{guestEmail}</p>
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--card)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder:text-[var(--muted)]"
                />
                {signupError && (
                  <p className="text-red-400 text-xs">{signupError}</p>
                )}
                <button
                  type="submit"
                  disabled={signupState === "submitting"}
                  className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {signupState === "submitting" ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </div>
          )}

          {guestEmail && signupState === "done" && (
            <div className="border border-[var(--border)] px-8 py-8 mb-12 text-left">
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-3">
                Account Created
              </p>
              <p className="text-[var(--foreground)] text-sm leading-relaxed">
                You&apos;re signed in.
                {claimedPoints && claimedPoints > 0
                  ? ` ${claimedPoints} points from this order have been added to your balance.`
                  : ""}
              </p>
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <Link
              href="/shop"
              className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light text-[var(--foreground)] mb-4">
            Something went wrong
          </h1>
          <p className="text-[var(--muted)] mb-8">
            Your payment was processed but we had trouble confirming your order.
            Please contact us at preveil.llc@gmail.com with your order details.
          </p>
          <Link href="/" className="text-[var(--accent-gold)] text-sm tracking-widest uppercase">
            Return Home
          </Link>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
