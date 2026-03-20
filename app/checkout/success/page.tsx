import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <p className="text-[var(--accent-gold)] text-sm tracking-[0.4em] uppercase mb-6">
        Order Confirmed
      </p>
      <h1 className="font-[family-name:var(--font-heading)] text-5xl font-light tracking-wide text-[var(--foreground)] mb-6">
        Thank you
      </h1>
      <p className="text-[var(--muted)] leading-relaxed mb-12">
        Your order has been received and is being prepared. You will receive a
        confirmation email shortly.
      </p>
      <Link
        href="/shop"
        className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
