# Usage Guide

This guide covers all major user flows and features in autoPOD. For setup, see `setup.md`. For API details, see `api-backend.md` and `api-frontend.md`.

## 1. Authentication & User Management
- Sign up or sign in using email/password, magic link, phone/SMS, or OAuth (Google, etc.).
- Manage your profile and password in the user settings.
- Admins can manage users and permissions (if enabled).

## 2. Product & Template Management
- **View Products**: Browse all products in the dashboard.
- **Create Product**: Use the product creation form to add new products. You can:
  - Select a template (Gelato, Printful, Printify)
  - Upload images/files (stored in Supabase Storage)
  - Auto-generate product titles/descriptions with AI (see below)
  - Set variants, pricing, and metadata
- **Edit Product**: Update product details, images, or variants.
- **Sync Templates**: Admins can trigger a sync with Gelato/Printful/Printify to fetch the latest templates and variants.
- **Order Management**: View and manage orders (if enabled for your role).

## 3. File Uploads & Asset Management
- Upload product images, print files, and assets via the UI.
- All files are stored in Supabase Storage and served via Smart CDN.
- Preview images and files before submitting.

## 4. AI Content Generation (OpenRouter)
- On product creation/edit, use the "Generate with AI" button to auto-generate:
  - Product titles
  - Descriptions
  - SEO metadata
- All AI content is generated server-side using OpenRouter (free models only).
- See `api-backend.md` for AI endpoints and model details.

## 5. Google Sheets Integration
- Import/export product and order data via Google Sheets.
- Use the "Google Sheets" integration in the dashboard to:
  - Connect your Google account
  - Import data from a sheet (products, orders, etc.)
  - Export current data to a sheet
- See `api-backend.md` for integration endpoints.

## 6. Real-time Features
- Product lists, order status, and notifications update in real time via Supabase Realtime.
- No need to refresh the page to see updates.

## 7. Notifications
- In-app notifications for important events (order status, sync complete, errors, etc.).
- Admins receive additional system notifications.

## 8. Admin Features
- Health check and sync controls available in the admin dashboard.
- Trigger manual syncs, view system health, and manage integrations.

## 9. Troubleshooting
- For common issues, see `troubleshooting.md` and `faq.md`.
- For API errors, check the browser console and network logs.
- For integration issues, ensure all API keys and environment variables are set.

## References
- [API Backend Docs](api-backend.md)
- [API Frontend Docs](api-frontend.md)
- [Troubleshooting](troubleshooting.md)
- [FAQ](faq.md)

## Example User Flow
1. Sign up and log in.
2. Navigate to the Templates page, select a template.
3. Upload required print files and images.
4. Click "Generate Product" (optionally use AI for metadata).
5. View product status and details in the dashboard.
6. Download or share product links as needed. 

## AI Image Generation (Midjourney)
- Go to `/ai/image`
- Enter a prompt describing the image you want to generate
- Click Generate
- Preview, download, or use the generated image in product creation

## AI Image Upscaling (Real-ESRGAN)
- Go to `/ai/upscale`
- Upload or select an image to upscale
- Click Upscale
- Preview, download, or use the upscaled image in product creation

All AI features are fully integrated with Supabase Storage and product creation flows. See the API docs for backend usage. 