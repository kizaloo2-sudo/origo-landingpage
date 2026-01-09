-- Migration: Add inserted_at column to leads_assessment if missing

ALTER TABLE IF EXISTS public.leads_assessment
ADD COLUMN IF NOT EXISTS inserted_at timestamptz DEFAULT now();

-- Backfill inserted_at from existing created_at values when available
UPDATE public.leads_assessment
SET inserted_at = created_at
WHERE inserted_at IS NULL AND created_at IS NOT NULL;

-- Ensure index on inserted_at for ordering
CREATE INDEX IF NOT EXISTS idx_leads_assessment_inserted_at ON public.leads_assessment (inserted_at);