"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

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
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("cart");
          setStatus("done");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

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
          <Link
            href="/shop"
            className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
          >
            Continue Shopping
          </Link>
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
