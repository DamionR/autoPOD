-- Migration: Create printful_products, printful_orders, printful_order_items, and printful_shops tables for Printful integration
-- Purpose: Store Printful product, order, and shop metadata, variants, and sync status
-- Affected: printful_products, printful_orders, printful_order_items, printful_shops tables, RLS policies

-- =====================
-- Printful Shops Table
-- =====================
create table if not exists public.printful_shops (
  id text primary key, -- Printful shop ID (string)
  user_id uuid not null, -- Supabase user ID (for multi-tenant access)
  title text not null, -- Shop name
  email text, -- Shop contact email
  status text, -- Shop status (e.g. 'active', 'inactive')
  raw jsonb, -- Full Printful shop object for future-proofing
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.printful_shops is 'Stores Printful shop metadata and user association for multi-tenant access.';

alter table public.printful_shops enable row level security;
create policy "Allow select for authenticated (own shops)" on public.printful_shops for select to authenticated using (user_id = (select auth.uid()));
create policy "Allow insert for authenticated (own shops)" on public.printful_shops for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Allow update for authenticated (own shops)" on public.printful_shops for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "Allow delete for authenticated (own shops)" on public.printful_shops for delete to authenticated using (user_id = (select auth.uid()));

-- ========================
-- Printful Products Table
-- ========================
create table if not exists public.printful_products (
  id text primary key, -- Printful product ID (string)
  shop_id text not null, -- Printful shop ID
  title text not null,
  description text,
  variants jsonb not null, -- All product variants as JSON
  images jsonb, -- Product images as JSON
  status text, -- Product status (e.g. 'published', 'draft')
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  raw jsonb, -- Full Printful product object for future-proofing
  constraint printful_products_shop_id_fkey foreign key (shop_id) references public.printful_shops(id) on delete cascade
);

comment on table public.printful_products is 'Stores Printful product metadata, variants, and sync status for each shop.';

alter table public.printful_products enable row level security;
create policy "Allow select for authenticated" on public.printful_products for select to authenticated using (true);
create policy "Allow insert for authenticated" on public.printful_products for insert to authenticated with check (true);
create policy "Allow update for authenticated" on public.printful_products for update to authenticated using (true) with check (true);
create policy "Allow delete for authenticated" on public.printful_products for delete to authenticated using (true);

-- ======================
-- Printful Orders Table
-- ======================
create table if not exists public.printful_orders (
  id text primary key, -- Printful order ID (string)
  user_id uuid not null, -- Supabase user ID
  shop_id text not null, -- Printful shop ID
  product_id text not null, -- Printful product ID
  status text not null, -- Order status
  tracking_code text, -- Tracking code (if available)
  tracking_url text, -- Tracking URL (if available)
  shipping_address jsonb, -- Shipping address
  total_amount numeric, -- Order total
  currency text, -- Currency code
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  raw jsonb -- Full Printful order object
);

comment on table public.printful_orders is 'Stores Printful order metadata, status, and sync info.';

alter table public.printful_orders enable row level security;
create policy "Authenticated can select printful_orders" on public.printful_orders for select to authenticated using (true);
create policy "Authenticated can insert printful_orders" on public.printful_orders for insert to authenticated with check (true);
create policy "Authenticated can update printful_orders" on public.printful_orders for update to authenticated using (true) with check (true);
create policy "Authenticated can delete printful_orders" on public.printful_orders for delete to authenticated using (true);

-- =============================
-- Printful Order Items Table
-- =============================
create table if not exists public.printful_order_items (
  id serial primary key,
  order_id text references public.printful_orders(id) on delete cascade,
  item_reference_id text not null,
  product_id text not null,
  variant_id text,
  quantity integer not null,
  status text,
  tracking_code text,
  tracking_url text,
  raw jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.printful_order_items is 'Stores individual items for each Printful order.';

alter table public.printful_order_items enable row level security;
create policy "Authenticated can select printful_order_items" on public.printful_order_items for select to authenticated using (true);
create policy "Authenticated can insert printful_order_items" on public.printful_order_items for insert to authenticated with check (true);
create policy "Authenticated can update printful_order_items" on public.printful_order_items for update to authenticated using (true) with check (true);
create policy "Authenticated can delete printful_order_items" on public.printful_order_items for delete to authenticated using (true); 