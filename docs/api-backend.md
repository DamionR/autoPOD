# Backend API Documentation

This document covers all backend API endpoints and flows for autoPOD. All backend logic is implemented as Supabase Edge Functions (TypeScript/Deno). For frontend API usage, see `api-frontend.md`.

## Overview
- All endpoints are serverless functions deployed via Supabase Edge Functions.
- All sensitive logic (API keys, AI, integrations) is server-side only.
- All endpoints require authentication unless otherwise noted.

## Authentication
- Uses Supabase Auth (JWT-based)
- Pass the user's JWT in the `Authorization: Bearer <token>` header for all requests.

## Endpoints

### 1. Product & Template Management
- `POST /functions/gelato-create-product` — Create a product from a Gelato template
- `POST /functions/printful-create-product` — Create a product from a Printful template
- `POST /functions/printify-create-product` — Create a product from a Printify template
- `GET /functions/gelato-get-product?id=...` — Get product details from Gelato
- `GET /functions/printful-get-product?id=...` — Get product details from Printful
- `GET /functions/printify-get-product?id=...` — Get product details from Printify
- `POST /functions/gelato-sync-templates` — Sync templates from Gelato
- `POST /functions/printful-sync-products` — Sync products from Printful
- `POST /functions/printify-sync-products` — Sync products from Printify

#### Request/Response Example
```json
POST /functions/gelato-create-product
{
  "templateId": "...",
  "title": "...",
  "description": "...",
  "variants": [...],
  "images": [...],
  ...
}
```
Response:
```json
{
  "success": true,
  "productId": "...",
  "details": {...}
}
```

### 2. Order Management
- `POST /functions/gelato-create-order` — Create an order in Gelato
- `POST /functions/printful-create-order` — Create an order in Printful
- `POST /functions/printify-create-order` — Create an order in Printify
- `GET /functions/gelato-sync-orders` — Sync orders from Gelato
- `GET /functions/printful-sync-orders` — Sync orders from Printful
- `GET /functions/printify-sync-orders` — Sync orders from Printify

### 3. File Uploads
- All file uploads are handled via Supabase Storage (see `api-frontend.md` for client usage)
- Provide public URLs for files/images to the product/order endpoints

### 4. AI Content Generation (OpenRouter)
- `POST /functions/ai-generate-content` — Generate product titles, descriptions, or SEO metadata
- `POST /functions/ai-generate-image` — Generate product images (if enabled)
- `POST /functions/ai-upscale-image` — Upscale images with AI
- All AI endpoints require server-side authentication and use only free OpenRouter models

#### Request/Response Example
```json
POST /functions/ai-generate-content
{
  "prompt": "Generate a product title for a custom mug",
  "type": "title"
}
```
Response:
```json
{
  "result": "Personalized Coffee Mug"
}
```

### 5. Google Sheets Integration
- `POST /functions/google-sheets-integration` — Import/export data to/from Google Sheets
- Requires OAuth token for the user's Google account
- Supports import/export of products, orders, and templates

### 6. Webhooks
- `POST /functions/gelato-webhook` — Handle Gelato webhook events
- `POST /functions/printful-webhook` — Handle Printful webhook events
- `POST /functions/printify-webhook` — Handle Printify webhook events
- All webhook endpoints validate signatures and log events

## Error Handling
- All endpoints return JSON with `success`, `error`, and `details` fields
- HTTP status codes are used appropriately (200, 400, 401, 403, 404, 500)
- Errors are logged server-side for monitoring

## Security & Environment Variables
- All API keys and secrets are stored in environment variables (never in frontend code)
- See `security.md` for details
- Required variables: `SUPABASE_SERVICE_ROLE_KEY`, `OPENROUTER_API_KEY`, `GELATO_API_KEY`, `PRINTFUL_API_KEY`, `PRINTIFY_API_KEY`, etc.

## References
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Gelato API Docs](https://dashboard.gelato.com/docs)
- [Printful API Docs](https://developers.printful.com/docs/)
- [Printify API Docs](https://developers.printify.com/)
- [OpenRouter API Docs](https://openrouter.ai/docs/api-reference)