-- ─── JobSetu Supabase SQL Schema & Public RLS Policies ──────────────────────
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/bxeqhgoyevchvhndwnvu/sql

CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'GOVT_JOB',
  organization VARCHAR(200) NOT NULL,
  post_count INTEGER,
  qualification VARCHAR(300),
  last_date DATE,
  official_link TEXT NOT NULL,
  state VARCHAR(100) DEFAULT 'All India',
  exam_name VARCHAR(200),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exams (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  conducted_by VARCHAR(200) NOT NULL,
  frequency VARCHAR(100),
  official_site TEXT NOT NULL,
  description TEXT,
  is_top BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast filtering & sorting
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_exams_category ON public.exams(category);

-- Enable Row Level Security (RLS) with Public Read-Only Access
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active jobs" ON public.jobs;
CREATE POLICY "Public can read active jobs"
  ON public.jobs
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Public can read exams" ON public.exams;
CREATE POLICY "Public can read exams"
  ON public.exams
  FOR SELECT
  TO anon, authenticated
  USING (true);
