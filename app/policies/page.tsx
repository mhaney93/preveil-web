import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "Preveil store policies — returns, refunds, shipping, and privacy.",
};

export default function PoliciesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-[var(--foreground)] mb-12">
        Policies
      </h1>

      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
          Returns & Refunds
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            All Preveil products are made on demand — printed and fulfilled individually when you place your order. Because of this, we do not accept returns or exchanges for reasons such as ordering the wrong size, changing your mind, or buyer's remorse.
          </p>
          <p>
            If your order arrives damaged, defective, or incorrect, we will make it right. Contact us at{" "}
            <a
              href="mailto:preveil.llc@gmail.com"
              className="text-[var(--foreground)] hover:text-[var(--accent-gold)] transition-colors"
            >
              preveil.llc@gmail.com
            </a>{" "}
            within 30 days of delivery with a photo of the issue and your order number. We will arrange a replacement or refund at no cost to you.
          </p>
          <p>
            We are not responsible for delays or losses caused by the shipping carrier once a package has been handed off for delivery.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
          Shipping
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            Orders are typically fulfilled within 2–7 business days, then shipped to your address. Shipping times vary by destination and carrier.
          </p>
          <p>
            Once your order ships, you will receive a confirmation email with tracking information.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
          Privacy
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            We collect only the information necessary to process your order — your name, email, and shipping address. We do not sell or share your personal information with third parties, except as required to fulfill your order (e.g., passing your shipping address to our fulfillment partner).
          </p>
          <p>
            Payment information is handled securely by Stripe and is never stored on our servers.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
          Contact
        </h2>
        <p className="text-[var(--muted)] leading-relaxed">
          Questions about any of the above? Reach us at{" "}
          <a
            href="mailto:preveil.llc@gmail.com"
            className="text-[var(--foreground)] hover:text-[var(--accent-gold)] transition-colors"
          >
            preveil.llc@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
