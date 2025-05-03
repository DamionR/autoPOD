# Security Practices

This document describes security practices for autoPOD. All code and infrastructure must follow these standards.

## 1. Environment Variables & Secrets
- Store all secrets in environment variables (never in code or frontend)
- Use secure secret managers or environment variable stores in production
- Required secrets: Supabase keys, OpenRouter API key, Gelato/Printful/Printify API keys, etc.
- See `setup.md` and `deployment.md` for details

## 2. Supabase Security
- **Row Level Security (RLS)**: Enforced on all tables, with granular policies for each operation and role
- **Auth**: All endpoints require Supabase Auth (JWT)
- **Storage**: Buckets are configured for public/private access as needed; only public URLs are exposed to integrations
- **Realtime**: Only authorized users can subscribe to channels

## 3. Edge Functions & Server-side Logic
- All sensitive logic (API keys, AI, integrations) is server-side only (Edge Functions)
- Never expose secrets or sensitive logic in frontend code
- All API calls to third-party services are made from Edge Functions

## 4. Integrations
- API keys for Gelato, Printful, Printify, Google, and OpenRouter are never exposed to the frontend
- All integration errors are logged server-side (never leak sensitive info to users)
- Rotate API keys regularly and restrict their scope

## 5. Frontend Security
- Never store secrets or sensitive data in frontend code or environment
- All sensitive actions are performed via Edge Functions
- Use HTTPS for all API and asset requests

## 6. Monitoring & Auditing
- Monitor logs for suspicious activity and errors
- Use Supabase audit logs and error reporting
- Regularly review RLS policies and access controls

## References
- [Setup Guide](setup.md)
- [Deployment Guide](deployment.md)
- [Troubleshooting](troubleshooting.md) 