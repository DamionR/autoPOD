# autoPOD: E-commerce Automation Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-success)

**Production-ready, enterprise-grade system for e-commerce automation, print-on-demand, AI content generation, and scalable cloud backend.**

---

## Table of Contents
- [Project Overview & Value Proposition](#project-overview--value-proposition)
- [Features](#features)
- [Supported Integrations](#supported-integrations)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Contribution Guidelines](#contribution-guidelines)
- [Security & Compliance](#security--compliance)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Development Workflow](#development-workflow)

---

## Project Overview & Value Proposition

> **autoPOD** is a full-stack, production-grade platform for e-commerce automation, print-on-demand, and AI-powered content generation. It leverages Supabase for scalable backend services (database, auth, storage, edge functions, CRON), integrates with Gelato, Printful, and Printify APIs for product and order automation, supports Google Sheets for data sync, and uses OpenRouter for advanced AI content generation. The system is modular, secure, and ready for enterprise deployment.

- Automate product creation and order fulfillment with Gelato, Printful, and Printify
- Store and serve assets via Supabase Storage + Smart CDN
- AI-powered product titles, descriptions, and SEO metadata (OpenRouter, free models only)
- Google Sheets integration for import/export and reporting
- Enterprise-grade security, RLS, and compliance
- 100% test coverage, modular code, and clean monorepo structure

---

## Features

| Feature                        | Description                                                      | Status      |
|------------------------------- |------------------------------------------------------------------|-------------|
| Print-on-demand Automation     | Gelato, Printful, Printify API integration                        | ✅          |
| AI Content Generation          | Product titles, descriptions, SEO (OpenRouter, free models only)  | ✅          |
| Google Sheets Integration      | Import/export, reporting, sync                                    | ✅          |
| Supabase Backend               | DB, Auth, Storage, Edge Functions, CRON, Realtime                 | ✅          |
| Modular Monorepo               | Strict separation, clean structure                                | ✅          |
| Enterprise Security            | RLS, secure storage, best practices                               | ✅          |
| Real-time Features             | Subscriptions, live updates                                      | ✅          |
| 100% Test Coverage             | Unit, integration, E2E                                           | ✅          |

---

## Supported Integrations

| Integration     | Purpose                                 | Docs/Links |
|-----------------|-----------------------------------------|------------|
| Gelato API      | Print-on-demand automation              | [Gelato](https://dashboard.gelato.com/docs) |
| Printful API    | Print-on-demand automation              | [Printful](https://developers.printful.com/docs/) |
| Printify API    | Print-on-demand automation              | [Printify](https://developers.printify.com/) |
| Google Sheets   | Data import/export, reporting           | [Google Sheets](https://developers.google.com/sheets/api) |
| OpenRouter AI   | AI content generation (free models)     | [OpenRouter](https://openrouter.ai/docs) |
| Supabase        | Backend, Auth, Storage, Edge Functions  | [Supabase](https://supabase.com/docs) |

---

## Architecture

- **Backend:** Supabase Edge Functions (TypeScript/Deno), Supabase (DB, Auth, Storage, Edge Functions, CRON), Gelato API, Printful API, Printify API, Google Sheets API, OpenRouter AI
- **Frontend:** React (CRA, JS), Tailwind CSS, shadcn/ui, Supabase UI
- **Monorepo:** Strict separation of frontend and backend, all configs and dependencies isolated
- **Docs:** Modular, up-to-date, and actionable (see [`docs/`](docs/))

See [`docs/architecture.md`](docs/architecture.md) and [`docs/diagrams/`](docs/diagrams/) for detailed diagrams and explanations.

---

<details>
<summary><strong>Quick Start</strong></summary>

```sh
# 1. Clone the repository
$ git clone <repo-url>
$ cd autoPOD

# 2. Install frontend dependencies
$ cd frontend && npm install

# 3. Set up environment variables
#    (see docs/setup.md for details)

# 4. Start Supabase local development
$ supabase start

# 5. Run Supabase migrations
$ supabase db push

# 6. Start all services
$ npm run dev
```

> [!TIP]
> See [`docs/setup.md`](docs/setup.md) for full details and environment variable examples.

</details>

---

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd autoPOD
   ```
2. Install frontend dependencies:
   ```sh
   cd frontend && npm install
   ```
3. Set up environment variables in `frontend/.env` and `supabase/.env` (see [`docs/setup.md`](docs/setup.md) for details)
4. Start Supabase local development:
   ```sh
   supabase start
   ```
5. Run Supabase migrations:
   ```sh
   supabase db push
   ```
6. Start all services:
   ```sh
   npm run dev
   ```
   (Runs frontend and Supabase Edge Functions)

See [`docs/setup.md`](docs/setup.md) for full details and environment variable examples.

---

## Usage

- Access the frontend at [http://localhost:3000](http://localhost:3000)
- API endpoints are documented in [`docs/api-backend.md`](docs/api-backend.md) and [`docs/api-frontend.md`](docs/api-frontend.md)
- Authentication flows: email/password, magic link, phone/SMS, OAuth (Google, etc.)
- Product and template management, file uploads, real-time features
- AI content generation for product metadata (server-side only)
- Google Sheets import/export for product and order data

See [`docs/usage.md`](docs/usage.md) for user flows and feature guides.

---

## API Documentation

### Backend API
- All endpoints, request/response formats, and error handling in [`docs/api-backend.md`](docs/api-backend.md)
- Supabase Edge Functions documented in [`supabase/functions/`](supabase/functions/)

### Frontend API
- API integration and usage in [`docs/api-frontend.md`](docs/api-frontend.md)
- Supabase client usage, authentication, and storage

---

## Testing

- 100% unit and integration test coverage required
- Frontend: Jest + React Testing Library
- Edge Functions: Deno test
- See [`docs/testing.md`](docs/testing.md) for test strategy, coverage reports, and CI setup

---

## Deployment

- Production deployment instructions in [`docs/deployment.md`](docs/deployment.md)
- Environment variable management and security best practices
- Zero-downtime migrations and rollbacks
- CDN and cache configuration for assets

---

<details>
<summary><strong>Troubleshooting & FAQ</strong></summary>

- Common issues and solutions in [`docs/troubleshooting.md`](docs/troubleshooting.md)
- FAQ in [`docs/faq.md`](docs/faq.md)
- Contact support via issues or [`docs/faq.md`](docs/faq.md)

</details>

---

## Contribution Guidelines

- All contributors must read and follow [`docs/contribution.md`](docs/contribution.md)
- Strict code review, PR, and code standards
- Atomic commits, descriptive messages, and logical grouping
- See [`docs/contribution.md`](docs/contribution.md) for PR process and review requirements

### Contributor Onboarding Checklist

- [ ] Read [`docs/contribution.md`](docs/contribution.md)
- [ ] Set up local environment and run all tests
- [ ] Follow code style and commit message guidelines
- [ ] Submit PR with clear description and testing steps
- [ ] Request review from at least one other engineer

---

> [!IMPORTANT]
> **Security Notice:** Never expose secrets or API keys in frontend or public code. All sensitive logic is server-side only (Edge Functions). RLS, secure storage, and best practices enforced. See [`docs/security.md`](docs/security.md) for details.

---

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

## Acknowledgments

- Supabase team for backend infrastructure
- Gelato, Printful, and Printify for print-on-demand APIs
- OpenRouter for AI content generation
- shadcn/ui and Tailwind Labs for UI components and styling
- All contributors and open source maintainers

---

## Development Workflow

To start both the frontend (React) and Supabase local dev stack, simply run:

```sh
npm run dev
```

This command will concurrently start the Supabase backend and the frontend development server. You can also start them individually with `npm run dev:frontend` or `npm run dev:supabase`. 