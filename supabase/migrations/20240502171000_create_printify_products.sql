-- Migration: Create printify_products table for Printify integration
-- Purpose: Store Printify product metadata, variants, and sync status
-- Affected: printify_products table, RLS policies

create table if not exists public.printify_products (
  id text primary key, -- Printify product ID (string)
  shop_id text not null, -- Printify shop ID
  title text not null,
  description text,
  blueprint_id integer not null, -- Printify blueprint (catalog) ID
  print_provider_id integer not null, -- Printify print provider ID
  variants jsonb not null, -- All product variants as JSON
  images jsonb, -- Product images as JSON
  status text, -- Product status (e.g. 'published', 'draft')
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  raw jsonb, -- Full Printify product object for future-proofing
  constraint printify_products_shop_id_fkey foreign key (shop_id) references public.printify_shops(id) on delete cascade
);

comment on table public.printify_products is 'Stores Printify product metadata, variants, and sync status for each shop.';

-- Enable Row Level Security (RLS)
alter table public.printify_products enable row level security;

-- RLS Policies: Allow authenticated users full access (adjust as needed for production)
create policy "Allow select for authenticated" on public.printify_products for select to authenticated using (true);
create policy "Allow insert for authenticated" on public.printify_products for insert to authenticated with check (true);
create policy "Allow update for authenticated" on public.printify_products for update to authenticated using (true) with check (true);
create policy "Allow delete for authenticated" on public.printify_products for delete to authenticated using (true); 