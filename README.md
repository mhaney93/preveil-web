# Preveil

Custom-built e-commerce storefront for **Preveil**, a print-on-demand apparel and home-goods brand
themed around "re-enchantment." Built from scratch instead of using Shopify to avoid platform fees
and keep full control of the stack.

> **Status: archived.** The business was wound down in 2026. This repository is preserved as a
> portfolio piece and a starting point for a possible future relaunch. Live services
> (database, payments, fulfilment) are disconnected.

## What it does

- **Storefront** — server-rendered product catalog with category / subcategory browsing,
  per-variant pricing and imagery, size guides, and instant client-side category filtering
- **Cart & checkout** — persistent cart, Stripe payment flow with embedded card element,
  real-time shipping-rate quotes and tax calculation
- **Accounts** — Supabase-auth sign-up / login / password reset, order history, loyalty points,
  guest-order claiming, full account deletion
- **Fulfilment** — orders forwarded to the Printful API automatically; Printful webhooks update
  shipment status
- **Transactional email** — branded welcome, post-purchase, and abandoned-cart emails via Resend
- **Automation** — cron routes for abandoned-cart recovery, monthly repricing, and content-queue
  monitoring
- **Admin** — lightweight internal dashboard for orders and catalog

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database / Auth | Supabase (Postgres + Auth) |
| Payments | Stripe |
| Fulfilment | Printful API |
| Email | Resend |
| Image storage | Cloudflare R2 (S3 API) |
| Hosting | Vercel |

## Structure

```
app/
  page.tsx            landing page
  shop/               catalog + product detail
  cart/  checkout/     cart and Stripe checkout
  account/  auth/      Supabase auth + customer account
  admin/              internal dashboard
  about/  policies/     brand + legal content
  api/
    checkout/          create payment intent
    shipping-rates/    Printful live rates
    orders/            order creation + Printful submission
    claim-order/       attach guest orders to an account
    webhooks/          Stripe + Printful + Supabase
    cron/              abandoned-cart, reprice, content checks
lib/
  supabase/           SSR + browser clients
  process-order.ts    order → Printful pipeline
  email-templates.ts  Resend templates
```

## Running locally

```bash
npm install
npm run dev
```

Requires a `.env.local` with Supabase, Stripe, Printful, Resend, and R2 credentials
(not included). See the client modules in `lib/` and the `api/` routes for the exact
variable names.

## License

No license granted — provided for reference only.
