# Setup & Installation

This guide will help you set up autoPOD for local development and production. All steps are modular, actionable, and production-grade.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local dev, migrations, and Edge Functions)
- [Git](https://git-scm.com/)

## 1. Clone the Repository

```sh
git clone <repo-url>
cd autoPOD
```

## 2. Install Frontend Dependencies

```sh
cd frontend
npm install
```

## 3. Set Up Environment Variables

### Frontend (`frontend/.env`)
- `REACT_APP_SUPABASE_URL`: Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anon/public key
- `REACT_APP_API_BASE_URL`: (Optional) Custom API base URL if not using default
- `REACT_APP_GOOGLE_CLIENT_ID`: (Optional) For Google OAuth

### Supabase (`supabase/.env`)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (never expose in frontend)
- `SUPABASE_DB_URL`: Local database connection string (for CLI/migrations)
- `OPENROUTER_API_KEY`: OpenRouter API key (for AI content generation, server-side only)
- `GELATO_API_KEY`, `PRINTFUL_API_KEY`, `PRINTIFY_API_KEY`: API keys for integrations (server-side only)
- Any other integration secrets (see `docs/security.md`)

> See `.env.example` files (if present) for templates.

## 4. Start Supabase Local Development

```sh
supabase start
```

This will start the local Supabase stack (database, auth, storage, edge functions, etc.).

## 5. Run Database Migrations

```sh
supabase db push
```

This applies all schema changes and ensures your local DB matches the project state.

## 6. Start the Frontend

```sh
cd frontend
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 7. (Optional) Run Edge Functions Locally

```sh
supabase functions serve --env-file supabase/.env
```

## Troubleshooting

- If you see DB connection errors, check your `SUPABASE_DB_URL` and that Supabase is running.
- If environment variables are missing, double-check your `.env` files.
- For CORS or API errors, ensure all URLs and keys are correct and that Edge Functions are running.
- For more, see `docs/troubleshooting.md` and `docs/faq.md`.

## References
- [Deployment instructions](deployment.md)
- [Usage guide](usage.md)
- [Security practices](security.md) 