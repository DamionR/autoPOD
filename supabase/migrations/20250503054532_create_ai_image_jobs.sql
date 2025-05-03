-- Migration: Create ai_image_jobs table for logging AI image generation and upscaling jobs
-- Purpose: Store metadata and status for all Midjourney and Real-ESRGAN jobs
-- Affected: ai_image_jobs table, RLS policies

-- =====================
-- AI Image Jobs Table
-- =====================
create table if not exists public.ai_image_jobs (
  id uuid primary key default gen_random_uuid(), -- Unique job ID
  user_id uuid not null, -- Supabase user ID
  type text not null check (type in ('midjourney', 'realesrgan')), -- Job type
  prompt text, -- Prompt for image generation (nullable for upscaling)
  input_url text, -- Input image URL (nullable for Midjourney)
  output_url text, -- Output image URL (result)
  status text not null default 'pending', -- Job status: pending, running, success, error
  error text, -- Error message if failed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.ai_image_jobs is 'Logs all AI image generation (Midjourney) and upscaling (Real-ESRGAN) jobs, including status, user, prompt, input/output URLs, and errors.';

-- Enable Row Level Security
alter table public.ai_image_jobs enable row level security;

-- RLS Policies
-- Allow authenticated users to select their own jobs
create policy "Users can view their own AI image jobs" on public.ai_image_jobs
  for select to authenticated
  using (user_id = (select auth.uid()));

-- Allow authenticated users to insert jobs
create policy "Users can create AI image jobs" on public.ai_image_jobs
  for insert to authenticated
  with check (user_id = (select auth.uid()));

-- Allow authenticated users to update their own jobs
create policy "Users can update their own AI image jobs" on public.ai_image_jobs
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Allow authenticated users to delete their own jobs
create policy "Users can delete their own AI image jobs" on public.ai_image_jobs
  for delete to authenticated
  using (user_id = (select auth.uid())); 