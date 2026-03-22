-- Run this in the Supabase SQL Editor

-- Add user_id and printful_order_id to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS printful_order_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS points_redeemed INTEGER NOT NULL DEFAULT 0;

-- Points ledger table
-- amount is positive for earned/bonus, negative for redeemed
-- available_at determines when points become spendable
CREATE TABLE IF NOT EXISTS points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  type TEXT NOT NULL CHECK (type IN ('signup_bonus', 'earned', 'redeemed')),
  amount INTEGER NOT NULL,
  available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: users can only read their own points
ALTER TABLE points_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own points"
  ON points_ledger FOR SELECT
  USING (auth.uid() = user_id);

-- Signup bonus: award 150 points when a user confirms their email
CREATE OR REPLACE FUNCTION public.award_signup_bonus()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.points_ledger (user_id, type, amount, available_at)
    VALUES (NEW.id, 'signup_bonus', 150, NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_user_email_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.award_signup_bonus();
