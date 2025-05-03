# Deployment Guide

This document describes how to deploy autoPOD to production. All steps are modular, secure, and production-grade.

## 1. Prerequisites
- All environment variables and secrets set (see `setup.md` and `security.md`)
- Supabase project created and configured
- Production database and storage ready
- Frontend build ready for deployment

## 2. Environment Variables & Secrets
- Store all secrets in secure environment variable stores (never commit to code)
- Required variables: Supabase keys, OpenRouter API key, Gelato/Printful/Printify API keys, etc.
- See `security.md` for full list and handling

## 3. Deploy Supabase Backend
- Push all migrations to production DB:
  ```sh
  supabase db push --project-ref <prod-project-ref>
  ```
- Deploy Edge Functions:
  ```sh
  supabase functions deploy <function-name> --project-ref <prod-project-ref>
  ```
- Deploy all functions in `supabase/functions/` as needed
- Set all environment variables in the Supabase dashboard or CLI

## 4. Deploy Frontend
- Build the frontend:
  ```sh
  cd frontend
  npm run build
  ```
- Deploy the `frontend/build/` directory to your hosting provider (Vercel, Netlify, AWS, etc.)
- Set all frontend environment variables in your hosting provider's dashboard

## 5. Zero-Downtime Migrations & Rollbacks
- Always run DB migrations in a transaction
- Test migrations on a staging environment before production
- For rollback, revert schema changes and re-run migrations

## 6. Post-Deployment
- Verify all endpoints and integrations are working
- Monitor logs and error reports
- Run smoke tests and health checks

## References
- [Setup Guide](setup.md)
- [Security Practices](security.md)
- [Troubleshooting](troubleshooting.md) 