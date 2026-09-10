-- Run in Supabase SQL Editor before October 30, 2026
-- Required by Supabase's Data API grant change (announced 2026-05)
-- New projects: enforced May 30, 2026 | All projects: enforced October 30, 2026

-- products: read publicly (anon for shop page), full access for service role
grant select on public.products to anon;
grant select on public.products to authenticated;
grant select, insert, update, delete on public.products to service_role;

-- product_variants: read by authenticated users during checkout
grant select on public.product_variants to anon;
grant select on public.product_variants to authenticated;
grant select, insert, update, delete on public.product_variants to service_role;

-- orders: read/write by authenticated users (account page, checkout)
grant select, insert, update on public.orders to authenticated;
grant select, insert, update, delete on public.orders to service_role;

-- points_ledger: read by authenticated users (account page, checkout); written by service role
grant select on public.points_ledger to authenticated;
grant select, insert, update, delete on public.points_ledger to service_role;

-- abandoned_carts: server-side only (cart API route uses service role)
grant select, insert, update, delete on public.abandoned_carts to service_role;

-- quotes: cron + admin page (service role only)
grant select, insert, update on public.quotes to service_role;

-- image_prompts: cron + admin page (service role only)
grant select, insert, update on public.image_prompts to service_role;
