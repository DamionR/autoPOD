-- Migration: Create gelato_orders and gelato_order_items tables for Gelato integration
-- Purpose: Store Gelato order metadata, items, status, and sync with webhooks
-- Affected: gelato_orders, gelato_order_items tables, RLS policies

create table if not exists public.gelato_orders (
  id text primary key, -- Gelato order ID (string)
  user_id uuid not null, -- Supabase user ID
  product_id text not null, -- Gelato product ID
  status text not null, -- Order status
  tracking_code text, -- Tracking code (if available)
  tracking_url text, -- Tracking URL (if available)
  shipping_address jsonb, -- Shipping address
  total_amount numeric, -- Order total
  currency text, -- Currency code
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  raw jsonb -- Full Gelato order object
);

create table if not exists public.gelato_order_items (
  id serial primary key,
  order_id text references public.gelato_orders(id) on delete cascade,
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
alter table public.gelato_orders enable row level security;
alter table public.gelato_order_items enable row level security;

-- RLS policies for authenticated users
create policy "Authenticated can select gelato_orders" on public.gelato_orders for select to authenticated using (true);
create policy "Authenticated can insert gelato_orders" on public.gelato_orders for insert to authenticated with check (true);
create policy "Authenticated can update gelato_orders" on public.gelato_orders for update to authenticated using (true) with check (true);
create policy "Authenticated can delete gelato_orders" on public.gelato_orders for delete to authenticated using (true);

create policy "Authenticated can select gelato_order_items" on public.gelato_order_items for select to authenticated using (true);
create policy "Authenticated can insert gelato_order_items" on public.gelato_order_items for insert to authenticated with check (true);
create policy "Authenticated can update gelato_order_items" on public.gelato_order_items for update to authenticated using (true) with check (true);
create policy "Authenticated can delete gelato_order_items" on public.gelato_order_items for delete to authenticated using (true);

-- Comments
comment on table public.gelato_orders is 'Stores Gelato order metadata, status, and sync info.';
comment on table public.gelato_order_items is 'Stores individual items for each Gelato order.'; 