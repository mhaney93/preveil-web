import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & Legal",
  description: "Preveil LLC legal policies — terms of service, privacy policy, returns, refunds, and shipping.",
};

export default function PoliciesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-h3 font-light tracking-widest uppercase text-[var(--foreground)] mb-4">
        Policies & Legal
      </h1>
      <p className="text-sm text-[var(--muted)] mb-12">
        Effective date: April 16, 2025 &nbsp;·&nbsp; Preveil LLC
      </p>

      {/* TERMS OF SERVICE */}
      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-6">
          Terms of Service
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            By accessing or purchasing from preveil.shop, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Use of the Site</h3>
          <p>
            You may use this site for lawful personal purposes only. You agree not to misuse the site, attempt to gain unauthorized access to any part of it, or use it in any way that could damage, disable, or impair the site or interfere with other users.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Product Descriptions</h3>
          <p>
            We make every effort to display products accurately, including colors, sizes, and descriptions. However, we do not guarantee that product descriptions or other content is accurate, complete, or error-free. All products are subject to availability.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Pricing & Orders</h3>
          <p>
            All prices are in US dollars. We reserve the right to correct pricing errors and to cancel any order placed at an incorrect price. An order confirmation does not constitute acceptance of an order — acceptance occurs when the order is fulfilled and shipped.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Intellectual Property</h3>
          <p>
            All content on this site — including artwork, graphics, logos, text, and product designs — is the property of Preveil LLC and is protected by applicable copyright and trademark law. You may not reproduce, distribute, or create derivative works from any content on this site without express written permission.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Disclaimer of Warranties</h3>
          <p>
            This site and its contents are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose. Preveil LLC does not warrant that the site will be uninterrupted or error-free.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, Preveil LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this site or purchase of products, even if advised of the possibility of such damages. Our total liability to you shall not exceed the amount you paid for the specific order giving rise to the claim.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Governing Law</h3>
          <p>
            These Terms are governed by the laws of the United States. Any disputes shall be resolved in the appropriate courts of the state in which Preveil LLC is registered.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Changes to Terms</h3>
          <p>
            We reserve the right to update these Terms at any time. Continued use of the site after changes are posted constitutes acceptance of the updated Terms.
          </p>
        </div>
      </section>

      <div className="border-t border-[var(--border)] my-10" />

      {/* PRIVACY POLICY */}
      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-6">
          Privacy Policy
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            Preveil LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your personal information. This policy explains what we collect, how we use it, and your rights.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Information We Collect</h3>
          <p>
            When you create an account or place an order, we collect your name, email address, and shipping address. When you check out, payment is processed securely by Stripe — we never see or store your full card number. We may also collect basic usage data (pages visited, browser type) to improve the site.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping notifications</li>
            <li>Respond to customer service inquiries</li>
            <li>Improve site performance and user experience</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Third-Party Service Providers</h3>
          <p>
            We share your information only as necessary to operate our business: your shipping address is passed to Printful (our fulfillment partner) to produce and ship your order; payment data is handled by Stripe; transactional emails are sent via Resend; and account data is stored in Supabase. Each provider maintains their own security and privacy practices.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Data Retention</h3>
          <p>
            We retain your account and order data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us at{" "}
            <a href="mailto:preveil.llc@gmail.com" className="text-[var(--foreground)] hover:text-[var(--accent-gold)] transition-colors">
              preveil.llc@gmail.com
            </a>
            .
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Cookies</h3>
          <p>
            This site uses essential cookies to maintain your session and cart. We do not use third-party advertising cookies or tracking pixels.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Security</h3>
          <p>
            We use industry-standard measures to protect your data. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we take reasonable steps to protect your information.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Children&apos;s Privacy</h3>
          <p>
            This site is not directed to children under 13. We do not knowingly collect personal information from children.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Changes to This Policy</h3>
          <p>
            We may update this policy from time to time. The effective date at the top of this page will reflect the most recent revision.
          </p>
        </div>
      </section>

      <div className="border-t border-[var(--border)] my-10" />

      {/* RETURNS & REFUNDS */}
      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-6">
          Returns & Refunds
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            All Preveil products are made on demand — printed and fulfilled individually when you place your order. Because each item is produced specifically for you, we do not accept returns or exchanges for reasons such as ordering the wrong size, a change of mind, or buyer&apos;s remorse.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Damaged, Defective, or Incorrect Orders</h3>
          <p>
            If your order arrives damaged, defective, or materially different from what was ordered, we will make it right at no cost to you. Contact us at{" "}
            <a href="mailto:preveil.llc@gmail.com" className="text-[var(--foreground)] hover:text-[var(--accent-gold)] transition-colors">
              preveil.llc@gmail.com
            </a>{" "}
            within <strong className="text-[var(--foreground)] font-normal">30 days of delivery</strong> with:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Your order number</li>
            <li>A clear photo showing the defect or error</li>
          </ul>
          <p>
            We will arrange a replacement or full refund depending on the nature of the issue. Refunds are issued to the original payment method and may take 5–10 business days to appear.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Sizing</h3>
          <p>
            Size charts are provided on each product page. We are not responsible for items ordered in the wrong size. Please review size information carefully before purchasing.
          </p>

          <h3 className="text-xs tracking-widest uppercase text-[var(--foreground)] pt-2">Shipping Issues</h3>
          <p>
            We are not responsible for delays, losses, or damage caused by the shipping carrier after a package has been handed off for delivery. If your package is lost in transit, contact us and we will do our best to assist.
          </p>
        </div>
      </section>

      <div className="border-t border-[var(--border)] my-10" />

      {/* SHIPPING */}
      <section className="mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-6">
          Shipping
        </h2>
        <div className="text-[var(--muted)] leading-relaxed space-y-4">
          <p>
            Orders are fulfilled by Printful and typically enter production within 2–7 business days of being placed. Shipping times vary by destination and carrier, and are in addition to fulfillment time.
          </p>
          <p>
            Once your order ships, you will receive a confirmation email with tracking information. We currently ship within the United States.
          </p>
          <p>
            Preveil LLC is not responsible for delays caused by carrier disruptions, weather events, or customs processing.
          </p>
        </div>
      </section>

      <div className="border-t border-[var(--border)] my-10" />

      {/* CONTACT */}
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
