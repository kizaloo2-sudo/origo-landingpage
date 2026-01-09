-- Migration: Create leads_assessment table

-- Ensure UUID generator (pgcrypto) is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.leads_assessment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_role text,
  company_industry text,
  answers jsonb,
  score_total integer,
  tier_result text,
  status text DEFAULT 'new',
  inserted_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_assessment_email ON public.leads_assessment (contact_email);