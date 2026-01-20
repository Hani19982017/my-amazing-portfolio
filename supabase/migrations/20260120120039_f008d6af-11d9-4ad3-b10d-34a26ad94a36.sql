-- Add new order form fields
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS occasion_date DATE,
ADD COLUMN IF NOT EXISTS similar_melody_link TEXT,
ADD COLUMN IF NOT EXISTS other_details TEXT,
ADD COLUMN IF NOT EXISTS version_type TEXT,
ADD COLUMN IF NOT EXISTS add_blessings BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS desired_duration TEXT,
ADD COLUMN IF NOT EXISTS delivery_method TEXT;