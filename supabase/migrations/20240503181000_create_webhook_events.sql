-- Migration: Create webhook_events table for logging all webhook events
-- Purpose: Store all webhook events from Gelato and Printify for audit/debug
-- Affected: webhook_events table, RLS policies

create table if not exists public.webhook_events (
  id bigserial primary key,
  provider text not null, -- 'gelato' or 'printify'
  event_type text not null, -- Event type (e.g. order_status_updated)
  payload jsonb not null, -- Full webhook payload
  received_at timestamptz default now(),
  processed_at timestamptz,
  status text, -- 'processed', 'error', etc
  error text -- Error message if processing failed
);

-- Enable RLS
alter table public.webhook_events enable row level security;

-- RLS policies for authenticated users
create policy "Authenticated can select webhook_events" on public.webhook_events for select to authenticated using (true);
create policy "Authenticated can insert webhook_events" on public.webhook_events for insert to authenticated with check (true);
create policy "Authenticated can update webhook_events" on public.webhook_events for update to authenticated using (true) with check (true);
create policy "Authenticated can delete webhook_events" on public.webhook_events for delete to authenticated using (true);

-- Comments
comment on table public.webhook_events is 'Logs all webhook events from Gelato and Printify for audit and debugging.'; 