-- Migration: Create printify_orders and printify_order_items tables for Printify integration
-- Purpose: Store Printify order metadata, items, status, and sync with webhooks
-- Affected: printify_orders, printify_order_items tables, RLS policies

create table if not exists public.printify_orders (
  id text primary key, -- Printify order ID (string)
  user_id uuid not null, -- Supabase user ID
  shop_id text not null, -- Printify shop ID
  product_id text not null, -- Printify product ID
  status text not null, -- Order status
  tracking_code text, -- Tracking code (if available)
  tracking_url text, -- Tracking URL (if available)
  shipping_address jsonb, -- Shipping address
  total_amount numeric, -- Order total
  currency text, -- Currency code
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  raw jsonb -- Full Printify order object
);

create table if not exists public.printify_order_items (
  id serial primary key,
  order_id text references public.printify_orders(id) on delete cascade,
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

-- Enable RLS
alter table public.printify_orders enable row level security;
alter table public.printify_order_items enable row level security;

-- RLS policies for authenticated users
create policy "Authenticated can select printify_orders" on public.printify_orders for select to authenticated using (true);
create policy "Authenticated can insert printify_orders" on public.printify_orders for insert to authenticated with check (true);
create policy "Authenticated can update printify_orders" on public.printify_orders for update to authenticated using (true) with check (true);
create policy "Authenticated can delete printify_orders" on public.printify_orders for delete to authenticated using (true);

create policy "Authenticated can select printify_order_items" on public.printify_order_items for select to authenticated using (true);
create policy "Authenticated can insert printify_order_items" on public.printify_order_items for insert to authenticated with check (true);
create policy "Authenticated can update printify_order_items" on public.printify_order_items for update to authenticated using (true) with check (true);
create policy "Authenticated can delete printify_order_items" on public.printify_order_items for delete to authenticated using (true);

-- Comments
comment on table public.printify_orders is 'Stores Printify order metadata, status, and sync info.';
comment on table public.printify_order_items is 'Stores individual items for each Printify order.'; 