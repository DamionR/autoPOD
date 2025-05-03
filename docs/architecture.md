# System Architecture

This document describes the architecture of autoPOD, including all major components, integrations, and flows. For diagrams, see `diagrams/`.

## Overview
- **Frontend**: React (CRA), Tailwind CSS, shadcn/ui, modular UI components
- **Backend**: Supabase (DB, Auth, Storage, Edge Functions, CRON, Realtime)
- **Integrations**: Gelato, Printful, Printify, Google Sheets, OpenRouter AI
- **Monorepo**: Strict separation of frontend and backend, modular code, and clear folder structure

## Components

### 1. Supabase Backend
- **Database**: PostgreSQL, managed by Supabase, with RLS and granular policies
- **Auth**: Supabase Auth (JWT, email/password, OAuth, phone/SMS)
- **Storage**: Supabase Storage for all files/assets, served via Smart CDN
- **Edge Functions**: TypeScript/Deno serverless functions for all backend logic (product, order, AI, integrations)
- **CRON Jobs**: Automated syncs and background jobs (e.g., template/product sync)
- **Realtime**: Subscriptions for live updates (products, orders, notifications)

### 2. Frontend
- **React**: Modular, component-based UI
- **API Modules**: All API calls in `src/api/` (see `api-frontend.md`)
- **Context**: Auth and notification state managed via React context
- **UI**: Accessible, responsive, and production-grade

### 3. Integrations
- **Gelato API**: Product/template/order automation (Edge Functions)
- **Printful API**: Product/template/order automation (Edge Functions)
- **Printify API**: Product/template/order automation (Edge Functions)
- **Google Sheets**: Import/export via Edge Functions and OAuth
- **OpenRouter AI**: AI content generation (titles, descriptions, SEO, images)

## Security & Modularity
- All sensitive logic and API keys are server-side only (Edge Functions)
- RLS and granular policies on all DB tables
- Modular codebase: each integration and feature is isolated
- No secrets or sensitive logic in frontend code

## Diagrams
- See `diagrams/` for:
  - System overview
  - Data flow (frontend <-> Edge Functions <-> integrations)
  - Auth and RLS flows
  - Storage and CDN

## References
- [API Backend Docs](api-backend.md)
- [API Frontend Docs](api-frontend.md)
- [Setup Guide](setup.md)
- [Security Practices](security.md)
- [Deployment](deployment.md) 