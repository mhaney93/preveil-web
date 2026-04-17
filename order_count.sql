-- Run this in the Supabase SQL Editor

ALTER TABLE products ADD COLUMN IF NOT EXISTS order_count integer NOT NULL DEFAULT 0;

-- Atomic increment so concurrent orders don't race
CREATE OR REPLACE FUNCTION increment_order_count(product_id uuid, amount integer)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE products
  SET order_count = order_count + amount
  WHERE id = product_id;
$$;
