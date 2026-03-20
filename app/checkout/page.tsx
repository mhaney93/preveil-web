"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  image: string | null;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

function CheckoutForm({
  cart,
  shipping,
}: {
  cart: CartItem[];
  shipping: ShippingAddress;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: shipping.name,
            email: shipping.email,
            address: {
              line1: shipping.address1,
              line2: shipping.address2,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip,
              country: "US",
            },
          },
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed.");
      setProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [shipping, setShipping] = useState<ShippingAddress>({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") ?? "[]"));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
    setStep("payment");
  }

  const inputClass =
    "w-full bg-[var(--card)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder:text-[var(--muted)]";

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-[var(--muted)] tracking-widest uppercase text-sm">
          Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-16 text-[var(--foreground)]">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Form */}
        <div>
          {step === "shipping" ? (
            <>
              <h2 className="text-xs tracking-widest uppercase text-[var(--muted)] mb-6">
                Shipping Information
              </h2>
              <form onSubmit={handleShippingSubmit} className="flex flex-col gap-4">
                <input required placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className={inputClass} />
                <input required type="email" placeholder="Email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className={inputClass} />
                <input required placeholder="Address Line 1" value={shipping.address1} onChange={(e) => setShipping({ ...shipping, address1: e.target.value })} className={inputClass} />
                <input placeholder="Address Line 2 (optional)" value={shipping.address2} onChange={(e) => setShipping({ ...shipping, address2: e.target.value })} className={inputClass} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} />
                  <input required placeholder="State" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className={inputClass} />
                </div>
                <input required placeholder="ZIP Code" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className={inputClass} />
                <button type="submit" className="mt-2 px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors">
                  Continue to Payment
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xs tracking-widest uppercase text-[var(--muted)] mb-6">
                Payment
              </h2>
              {clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "night",
                      variables: {
                        colorPrimary: "#c8a45a",
                        colorBackground: "#161210",
                        colorText: "#f0ead6",
                        colorTextPlaceholder: "#6b6560",
                        borderRadius: "0px",
                        fontFamily: "Georgia, serif",
                      },
                    },
                  }}
                >
                  <CheckoutForm cart={cart} shipping={shipping} />
                </Elements>
              )}
            </>
          )}
        </div>

        {/* Right: Order Summary */}
        <div>
          <h2 className="text-xs tracking-widest uppercase text-[var(--muted)] mb-6">
            Order Summary
          </h2>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.variantId} className="flex justify-between text-sm">
                <span className="text-[var(--foreground)]">
                  {item.name}{" "}
                  <span className="text-[var(--muted)]">× {item.quantity}</span>
                </span>
                <span className="text-[var(--accent-gold)]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-[var(--border)] pt-4 flex justify-between">
              <span className="text-xs tracking-widest uppercase text-[var(--muted)]">
                Total
              </span>
              <span className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--foreground)]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
