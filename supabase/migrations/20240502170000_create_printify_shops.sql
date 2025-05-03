-- Migration: Create printify_shops table for Printify integration
-- Purpose: Store Printify shop metadata and user association for multi-tenant support
-- Affected: printify_shops table, RLS policies

create table if not exists public.printify_shops (
  id text primary key, -- Printify shop ID (string)
  user_id uuid not null, -- Supabase user ID (for multi-tenant access)
  title text not null, -- Shop name
  email text, -- Shop contact email
  status text, -- Shop status (e.g. 'active', 'inactive')
  raw jsonb, -- Full Printify shop object for future-proofing
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.printify_shops is 'Stores Printify shop metadata and user association for multi-tenant access.';

-- Enable Row Level Security (RLS)
alter table public.printify_shops enable row level security;

-- RLS Policies: Allow authenticated users full access to their own shops
create policy "Allow select for authenticated (own shops)" on public.printify_shops for select to authenticated using (user_id = (select auth.uid()));
create policy "Allow insert for authenticated (own shops)" on public.printify_shops for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Allow update for authenticated (own shops)" on public.printify_shops for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "Allow delete for authenticated (own shops)" on public.printify_shops for delete to authenticated using (user_id = (select auth.uid())); 