-- Migration: Create google_sheets_integrations table for Google Sheets integration
-- Purpose: Store user Google Sheets OAuth tokens, account info, and sheet metadata for import/export
-- Affected: google_sheets_integrations table, RLS policies

create table if not exists public.google_sheets_integrations (
  id uuid primary key default gen_random_uuid(), -- Unique integration ID
  user_id uuid not null, -- Supabase user ID
  google_account_email text not null, -- Connected Google account email
  access_token text not null, -- Google OAuth access token (encrypted)
  refresh_token text not null, -- Google OAuth refresh token (encrypted)
  token_expiry timestamptz not null, -- Access token expiry
  sheet_id text, -- Last used Google Sheet ID (optional)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.google_sheets_integrations is 'Stores user Google Sheets OAuth tokens, account info, and sheet metadata for import/export. Used for secure, per-user Google Sheets integration.';

-- Enable Row Level Security (RLS)
alter table public.google_sheets_integrations enable row level security;

-- RLS Policies: Allow authenticated users full access to their own integrations
create policy "Allow select for authenticated (own integrations)" on public.google_sheets_integrations for select to authenticated using (user_id = (select auth.uid()));
create policy "Allow insert for authenticated (own integrations)" on public.google_sheets_integrations for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Allow update for authenticated (own integrations)" on public.google_sheets_integrations for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "Allow delete for authenticated (own integrations)" on public.google_sheets_integrations for delete to authenticated using (user_id = (select auth.uid()));

-- Comments:
-- - All tokens must be encrypted at rest (handled by application layer, not DB).
-- - Never expose tokens to frontend; all Google API calls must be server-side only.
-- - RLS ensures users can only access their own integration records. 