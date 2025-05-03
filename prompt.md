# Cursor Agent Project Bootstrap Prompt

You are an autonomous AI coding agent tasked with building a production-ready, enterprise-grade system for integrating the Gelato API with a Supabase-powered backend and a professional React frontend. You must operate at the level of a 25-year staff engineer, producing code and architecture that is immediately ready for production—no placeholders, no fake data, no incomplete stubs, and no example code.

You have access to the web and CLI. You are expected to use these tools to research, troubleshoot, and complete all tasks to the highest standard.

---

## Project Overview
- **Project Name:** gelato-api
- **Supabase Project ID:** ewekryzxfcisymnyjhum
- **Supabase Project Public KEY** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZWtyeXp4ZmNpc3ltbnlqaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTIwNzYsImV4cCI6MjA2MTc4ODA3Nn0.5Cei8YJaIGASyuzIQOudtrFBA46fmeurSawdGLLoCQs
- **Supabase Project Service Role** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZWtyeXp4ZmNpc3ltbnlqaHVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxMjA3NiwiZXhwIjoyMDYxNzg4MDc2fQ.5uU0g-BAn-4Ntw85vpAs7aOCwh2ONa88wMKFPnUVPGc
- **Supabase Project URL:** https://ewekryzxfcisymnyjhum.supabase.co
- **Supabase Storage Upload File Size Limit*** 50MB (Equivalent to 52,428,800 bytes.)
- **Supbase Storage Bucket S3 Connection** https://ewekryzxfcisymnyjhum.supabase.co/storage/v1/s3
- **Supbase Storage Bucket S3 Connection Region** us-east-2
- **Supabase Project Data API Exposed Schemas(The schemas to expose in your API. Tables, views and stored procedures in these schemas will get API endpoints):** public, graphql_public
- **Supabase Project Data API Extra search path(Extra schemas to add to the search path of every request. Multiple schemas must be comma-separated):** public, extensions
- **Supabase Project Data API Max rows(The maximum number of rows returned from a view, table, or stored procedure. Limits payload size for accidental or malicious requests.):**

- **Backend:** Python (PEP8, Black, Flake8), FastAPI or similar, Supabase for database, storage, auth, edge functions, CRON jobs, and vector support. Use [supabase-py](https://github.com/supabase/supabase-py) for all Python Supabase integration.
- **Frontend:** Create React App (CRA), pure JavaScript (no TypeScript), React function components, Tailwind CSS, shadcn/ui, and Supabase UI components. Use `@supabase/supabase-js` for all frontend Supabase integration.
- **Integrations:**
  - **Gelato API**
    - **API Key:** `a761b23e-280a-4d78-8229-a71a5ae52da1-1b9c2ed4-07a0-4218-8374-e8abe395cab2:eb4c1755-4ab5-4c71-b48f-e589ea34df65` (Use only in secure server-side code. Never expose in frontend or public code. Always use environment variables for secrets.)
    - **Store ID:** `b7ed9b97-e6e4-4365-be50-3f5279ddd73d` (from https://dashboard.gelato.com/stores/b7ed9b97-e6e4-4365-be50-3f5279ddd73d/products/list)
    - **Base URL:** https://order.gelatoapis.com
    - All API requests must include the API key in the `X-API-KEY` header and be made over HTTPS.
    - Follow all [Gelato API documentation](https://dashboard.gelato.com/docs/) and project rules for secure, production-grade integration.
- **AI Content Generation (OpenRouter):**
  - All product titles, descriptions, SEO metadata, and other content generation must use [OpenRouter](https://openrouter.ai/) for AI-powered content generation.
  - **Only use free models from OpenRouter. The system must remain 100% free—paid models are strictly forbidden.**
  - The agent must always select the 5 best free models for each content generation task, based on context window, throughput, features (structured outputs, tool calling, etc.), and up-to-date availability. Re-check [OpenRouter's free model listings](https://openrouter.ai/models/?max_price=0&fmt=cards) regularly.
  - The agent must leverage all advanced OpenRouter features (model routing, provider routing, prompt caching, structured outputs, tool calling, etc.) and set up the integration in a modular, secure, and production-grade way from the start.
  - All OpenRouter integration, model selection, and content generation flows must be documented in the codebase, README, and `docs/` directory.
  - Never expose OpenRouter API keys or logic in frontend code; all AI content generation must be server-side only.
  - Reference the rule: `.cursor/rules/ai-content-generation.mdc` for all requirements and standards.
- **Storage:** Supabase Storage with Smart CDN for all assets and print files.
- **Auth:** Supabase Auth (password, social, magic link, phone/SMS, and third-party OAuth), with proper RLS and user profile management. All authentication flows must be implemented as per Supabase documentation.
- **CRON Jobs & Automation:**
  - Use Supabase CRON jobs to automate backend tasks, data sync, product/template refresh, scheduled reporting, and other recurring operations.
  - Schedule jobs using Supabase's CRON syntax in the project dashboard or via the CLI, specifying the frequency (e.g., every hour, daily at midnight, etc.).
  - All CRON jobs must invoke secure Supabase Edge Functions or backend endpoints, never exposing secrets or sensitive logic in public code.
  - Ensure all jobs are idempotent, production-grade, and follow project security, logging, and error-handling standards.
  - Document each job's purpose, schedule, and integration points in the `docs/` directory.
- **Testing:** **Unit testing must be set up for the entire frontend and backend, with 100% coverage.** All business logic and critical flows must be covered by unit and integration tests.
- **Other:** All code must be modular, maintainable, and follow best practices for security, performance, and accessibility.

**Supabase API Keys and Usage:**
- **anonpublic (safe for browser with RLS):**
  - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZWtyeXp4ZmNpc3ltbnlqaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTIwNzYsImV4cCI6MjA2MTc4ODA3Nn0.5Cei8YJaIGASyuzIQOudtrFBA46fmeurSawdGLLoCQs`
- **service_role (server only, never expose in frontend):**
  - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZWtyeXp4ZmNpc3ltbnlqaHVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxMjA3NiwiZXhwIjoyMDYxNzg4MDc2fQ.5uU0g-BAn-4Ntw85vpAs7aOCwh2ONa88wMKFPnUVPGc`
- **API Endpoint:** `https://ewekryzxfcisymnyjhum.supabase.co`
- **Client Initialization (Frontend):**
  ```js
  import { createClient } from '@supabase/supabase-js';
  const supabaseUrl = 'https://ewekryzxfcisymnyjhum.supabase.co';
  const supabaseKey = process.env.SUPABASE_KEY; // Use anon key in frontend
  const supabase = createClient(supabaseUrl, supabaseKey);
  ```
- **Client Initialization (Backend):**
  ```python
  import os
  from supabase import create_client, Client
  url: str = os.environ.get("SUPABASE_URL")
  key: str = os.environ.get("SUPABASE_KEY")
  supabase: Client = create_client(url, key)
  ```
- **Never expose the service_role key in frontend or public code.**
- **Always use environment variables for keys/secrets.**

**Supabase Authentication Flows:**
- Email/password sign up and login
- Magic link (email-based passwordless)
- Phone/SMS OTP sign up and login
- Third-party OAuth (Google, GitHub, Facebook, etc.)
- Password recovery, update, and user management
- All flows must be implemented using the official Supabase client libraries and must follow [Supabase Auth best practices](https://supabase.com/docs/guides/auth)

**Supabase API Usage Examples:**
- [See supabase-py usage for backend integration](https://github.com/supabase/supabase-py)
- [See @supabase/supabase-js usage for frontend integration](https://supabase.com/docs/reference/javascript)
- All database, storage, and edge function operations must use the appropriate client and follow project security and RLS rules.

**What to Avoid:**
- No placeholder content, fake data, or incomplete code.
- No example code or "to be implemented" stubs.
- No TypeScript in the frontend.
- No hardcoded secrets or API keys in code—always use environment variables.
- No files over 100 lines—split intelligently into smaller files/folders as per project standards.

---

## Additional Mandatory Requirements
- The Cursor Agent must set up Supabase using the provided keys, via the API, accurately creating the database in the `public` schema, Edge Functions, and all other required resources, using only up-to-date, non-deprecated methods for Deno, React, Tailwind, Python, and all other technologies.
- The agent must autonomously triple-check and confirm that all methods, components, and utilities are current and not deprecated, and continue building only with confirmed, modern approaches.
- The agent must ensure ESLint and all other linting/error-finding tools are set up and that there are no issues in the codebase.
- For the Python backend, the agent must start and manage the virtual environment before adding any packages, and ensure package management is robust and error-free.
- The agent must set up the frontend, backend, and Supabase to all start from a single command in the root `package.json` using `concurrently`, so the whole project can be started with one command.
- The agent must proactively handle routing, CORS, and network issues across the stack.
- The agent must ensure consistent use of the local host network, stop any conflicting processes on selected ports, and proceed without human input, always using a single terminal for all operations.

---

## Order for Reading and Applying Rules
1. `/Users/damionrashford/gelato-api/.cursor/rules/agent-behavior.mdc`
2. `/Users/damionrashford/gelato-api/.cursor/rules/clean-code.mdc`
3. `/Users/damionrashford/gelato-api/.cursor/rules/db-migration.mdc`
4. `/Users/damionrashford/gelato-api/.cursor/rules/gelato-integration.mdc`
5. `/Users/damionrashford/gelato-api/.cursor/rules/post-sql.mdc`
6. `/Users/damionrashford/gelato-api/.cursor/rules/project-standards.mdc`
7. `/Users/damionrashford/gelato-api/.cursor/rules/python-standards.mdc`
8. `/Users/damionrashford/gelato-api/.cursor/rules/react-standards.mdc`
9. `/Users/damionrashford/gelato-api/.cursor/rules/supa-db-function.mdc`
10. `/Users/damionrashford/gelato-api/.cursor/rules/supa-db.mdc`
11. `/Users/damionrashford/gelato-api/.cursor/rules/supa-rls.mdc`
12. `/Users/damionrashford/gelato-api/.cursor/rules/supabase-integration.mdc`
13. `/Users/damionrashford/gelato-api/.cursor/rules/supabase-rules.mdc`
14. `/Users/damionrashford/gelato-api/.cursor/rules/tailwind-standards.mdc`

---

## Explicit Task List for the Agent

1. **Read All Rules in the Specified Order**
   - Carefully read and internalize every rule file above, in the exact order listed.

2. **Document a Detailed, Step-by-Step and End-to-End Plan**
   - Before writing any code, document a comprehensive, step-by-step, and end-to-end plan for the entire system.
   - This plan must anticipate all files, folders, and modules needed, especially for the frontend, and must account for the 100-line rule.

3. **Scaffold the Frontend (CRA)**
   - Scaffold a new Create React App project in `/Users/damionrashford/gelato-api/frontend`.
   - **Only output the base structure of all files and folders needed for the frontend.**
   - Plan and document all components, pages, utilities, hooks, context, styles, and test files, ensuring no file will exceed 100 lines.
   - Do not write any implementation code yet—just the structure and file/folder plan.

4. **Create a Complete README in HTML**
   - Write a full, end-to-end README for the project in HTML format.
   - The README must cover: project overview, architecture, setup, installation, usage, API documentation, testing, deployment, troubleshooting, and contribution guidelines.
   - The README must be elite in structure and clarity, suitable for a top-tier open source or enterprise project.

5. **Create a Comprehensive `docs/` Directory**
   - Scaffold a `docs/` directory at the project root.
   - Plan and create documentation files that cover the entire application, including:
     - Setup and installation
     - Usage guides
     - API reference (backend and frontend)
     - Architecture diagrams and explanations
     - Testing strategy and coverage
     - Troubleshooting and FAQ
     - Deployment and environment configuration
     - Security and compliance
     - Contribution and code standards
   - Do not write the full content yet—just the structure and file/folder plan.

6. **Refer Back to the Plan, Docs, README, and Rules Before Any Code**
   - Before taking any autonomous action on the codebase, always refer back to the plan, the docs directory, the README, and all rule files.
   - Never deviate from the plan unless explicitly updated and documented.

7. **Use the Web and CLI for Research and Troubleshooting**
   - You are expected to use the web and CLI to find information, troubleshoot, and ensure all tasks are completed to the highest standard.

8. **Testing**
   - Set up unit testing for the entire frontend and backend, with 100% coverage as a non-negotiable requirement.
   - All business logic, API endpoints, and critical user flows must be covered by tests.

---

## Instructions for the Agent
- **Read all rules in the specified order before doing anything else.**
- **Document a detailed, step-by-step and end-to-end plan for the entire system before writing any code.**
- **Scaffold the frontend and docs as described, planning all files and folders in advance.**
- **Write a complete HTML README covering every aspect of the project.**
- **Never create or edit files without a plan. If a file will exceed 100 lines, break it down intelligently.**
- **If you get stuck or lack information, use the web/CLI, re-prompt yourself, document the issue, and persist until the task is fully complete.**
- **All code, migrations, and configurations must be production-ready, secure, and maintainable.**
- **All deliverables must be ready for direct integration into a real production system.**
- **No partial, fake, or placeholder content is allowed.**
- **All code must be modular, well-tested, and follow the highest standards of code quality and documentation.**

---

## Your first task
Read all rules, then document a detailed, step-by-step and end-to-end plan for the entire system. Next, scaffold the frontend and docs structure, and write the complete HTML README as described above. Do not write any implementation code until these steps are complete and reviewed.

--- 