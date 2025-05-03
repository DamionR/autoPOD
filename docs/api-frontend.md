# Frontend API Documentation

This document covers all frontend API usage and flows for autoPOD. For backend endpoints, see `api-backend.md`.

## Overview
- The frontend is built with React (CRA) and uses modular API modules in `src/api/`.
- All sensitive logic (API keys, AI, integrations) is server-side only.
- The frontend interacts with Supabase for auth, storage, realtime, and Edge Functions.

## API Modules
- `src/api/ai.js`: AI content generation (calls Edge Functions for OpenRouter)
- `src/api/gelato.js`: Gelato product/template/order API
- `src/api/printful.js`: Printful product/template/order API
- `src/api/printify.js`: Printify product/template/order API
- `src/api/googleSheets.js`: Google Sheets integration
- `src/api/supabase.js`: Supabase client (auth, storage, realtime)

## Authentication
- Uses Supabase Auth for all flows (email/password, magic link, phone/SMS, OAuth)
- Auth state is managed via React context (`src/context/AuthContext.js`)
- All API calls requiring auth include the user's JWT

## Product & Template Management
- Fetch, create, and update products/templates via API modules (calls Edge Functions)
- Upload images/files to Supabase Storage via `supabase.js`
- Sync templates and products via admin controls

## Order Management
- Create and manage orders via API modules (calls Edge Functions)
- View order status and history in the dashboard

## File Uploads
- Use the file upload UI to upload images/assets to Supabase Storage
- Get public URLs for use in product/order creation

## AI Content Generation
- Use `ai.js` to call Edge Functions for product title/description/SEO generation
- All AI requests are server-side only (never expose OpenRouter keys in frontend)

## Google Sheets Integration
- Use `googleSheets.js` to import/export data via Edge Functions
- Connect Google account via OAuth (handled server-side)

## Notifications
- In-app notifications are managed via React context (`src/context/NotificationContext.js`)
- Real-time updates via Supabase Realtime

## Security
- Never expose API keys or secrets in frontend code
- All sensitive actions are performed via Edge Functions
- See `security.md` for details

## References
- [Backend API Docs](api-backend.md)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [React Context](https://react.dev/reference/react/createContext)

## Supabase Client Usage
- Initialize the client in `src/supabaseClient.js`:
  ```js
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
  export default supabase;
  ```

## Authentication Flows
- Use Supabase Auth UI components for sign up, login, magic link, phone/SMS, and OAuth.
- **Google Auth:**
  - Use the `GoogleAuthButton` component or call:
    ```js
    await supabase.auth.signInWithOAuth({ provider: 'google' });
    ```
  - The user is redirected to Google, then back to the app with a Supabase session.
  - The session is automatically picked up by the AuthContext and used for all API requests.
- On successful login, the session is stored and used for all API requests.
- Example:
  ```js
  const { user, session, error } = await supabase.auth.signInWithPassword({ email, password });
  ```

## Backend API Integration
- All requests to backend endpoints must include the user's JWT:
  ```js
  const { data, error } = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  ```

## Storage
- Upload files to Supabase Storage using the client:
  ```js
  const { data, error } = await supabase.storage.from('public').upload('path/to/file.png', file);
  ```
- Get public URLs for use with Gelato API:
  ```js
  const { publicURL } = supabase.storage.from('public').getPublicUrl('path/to/file.png');
  ```

## Real-time Subscriptions
- Subscribe to product/order updates:
  ```js
  supabase.channel('products').on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
    // handle update
  }).subscribe();
  ```

## UI Components
- All API and storage logic is encapsulated in hooks and context for modularity.
- See `src/api/`, `src/hooks/`, and `src/components/` for implementation details.

## More
- For backend endpoints, see [api-backend.md](./api-backend.md).
- For troubleshooting, see [troubleshooting.md](./troubleshooting.md). 