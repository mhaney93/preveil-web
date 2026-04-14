-- Add Printful sync product ID to products table
-- Used by the product_updated webhook to auto-unpublish out-of-stock products
ALTER TABLE products ADD COLUMN IF NOT EXISTS printful_sync_product_id TEXT;
CREATE INDEX IF NOT EXISTS products_printful_sync_product_id_idx ON products (printful_sync_product_id);