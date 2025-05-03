# Frequently Asked Questions (FAQ)

This FAQ covers common questions about autoPOD. For troubleshooting, see `troubleshooting.md`.

## Setup & Environment
**Q: What are the required environment variables?**
A: See `setup.md` for a full list and descriptions for both frontend and Supabase.

**Q: Supabase won't start locally. What should I do?**
A: Ensure Docker is running and ports are free. See `troubleshooting.md`.

## Supabase & Edge Functions
**Q: How do I deploy Edge Functions?**
A: Use `supabase functions deploy <function-name>`. See `deployment.md`.

**Q: How do I run migrations?**
A: Use `supabase db push`. See `deployment.md`.

## Integrations
**Q: How do I connect Gelato, Printful, or Printify?**
A: Set the relevant API keys in your Supabase environment. See `setup.md` and `security.md`.

**Q: How do I use Google Sheets integration?**
A: Connect your Google account in the dashboard and use the import/export features. See `usage.md`.

**Q: Why isn't AI content generation working?**
A: Ensure your OpenRouter API key is set and only free models are used. See `troubleshooting.md`.

## Security
**Q: Where should I store API keys and secrets?**
A: Always in environment variables, never in frontend code. See `security.md`.

## Deployment
**Q: How do I deploy to production?**
A: See `deployment.md` for full instructions.

**Q: How do I roll back a migration?**
A: Revert schema changes and re-run migrations. See `deployment.md`.

## More Help
- For more, see `troubleshooting.md`, `setup.md`, and `deployment.md`.
- If your question isn't answered here, open an issue or contact the maintainers. 