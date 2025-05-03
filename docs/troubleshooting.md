# Troubleshooting Guide

This guide covers common issues and solutions for autoPOD. For more, see `faq.md` and relevant docs.

## 1. Setup Issues
- **Supabase not starting**: Ensure Docker is running and ports are free. Run `supabase start` again.
- **Missing environment variables**: Double-check `.env` files in both `frontend/` and `supabase/`.
- **Dependency errors**: Run `npm install` in `frontend/` and ensure Supabase CLI is installed.

## 2. Supabase & Edge Functions
- **DB connection errors**: Check `SUPABASE_DB_URL` and that Supabase is running.
- **Edge Function not found**: Ensure the function is deployed and named correctly. Run `supabase functions deploy <function-name>`.
- **Realtime not updating**: Check Supabase Realtime config and network connection.

## 3. Frontend Issues
- **App not loading**: Check browser console for errors. Ensure API URLs and keys are correct.
- **Auth not working**: Ensure Supabase Auth is configured and environment variables are set.
- **File uploads failing**: Check Supabase Storage config and file size limits.

## 4. Integrations
- **Gelato/Printful/Printify API errors**: Check API keys, endpoint URLs, and network access. See integration logs for details.
- **Google Sheets not syncing**: Ensure OAuth is complete and token is valid. Check logs for errors.
- **AI content not generating**: Ensure OpenRouter API key is set and only free models are used. Check Edge Function logs.

## 5. Deployment Issues
- **Migrations failing**: Check DB connection and schema files. Test migrations on staging first.
- **Environment variables missing in production**: Set all required variables in your hosting/Supabase dashboard.
- **Frontend not updating**: Clear cache and redeploy the build.

## References
- [Setup Guide](setup.md)
- [Deployment Guide](deployment.md)
- [Security Practices](security.md)
- [FAQ](faq.md) 