// midjourney.ts - Shared Midjourney API integration logic for Supabase Edge Functions
// All API keys/secrets must be loaded from environment variables

import { uploadToStorage } from "./supabase.ts";

const MIDJOURNEY_API_URL = Deno.env.get("MIDJOURNEY_API_URL");
const MIDJOURNEY_API_KEY = Deno.env.get("MIDJOURNEY_API_KEY");

if (!MIDJOURNEY_API_URL || !MIDJOURNEY_API_KEY) {
  throw new Error("Missing Midjourney API config");
}

/**
 * Options for Midjourney image generation
 */
export interface MidjourneyImageOptions {
  style?: string;
  aspect?: string;
  [key: string]: unknown; // Allow for future extensibility, but not 'any'
}

/**
 * Generate an image using Midjourney
 * @param {string} prompt - The prompt for image generation
 * @param {string} userId - The user ID
 * @param {object} [options] - Additional options (style, aspect, etc)
 * @returns {Promise<{url: string, metadata: any}>}
 */
export async function generateMidjourneyImage(
  prompt: string,
  userId: string,
  options: MidjourneyImageOptions = {},
) {
  const res = await fetch(`${MIDJOURNEY_API_URL}/imagine`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MIDJOURNEY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, ...options }),
  });
  if (!res.ok) throw new Error(`Midjourney API error: ${await res.text()}`);
  const data = await res.json();
  if (!data.image_url) throw new Error("No image_url in Midjourney response");
  // Download image and upload to Supabase Storage
  const imageRes = await fetch(data.image_url);
  if (!imageRes.ok) throw new Error("Failed to fetch generated image");
  const buffer = new Uint8Array(await imageRes.arrayBuffer());
  const storagePath = `public/ai/${userId}/${crypto.randomUUID()}.png`;
  const { publicUrl } = await uploadToStorage(storagePath, buffer, "image/png");
  return { url: publicUrl, metadata: data };
}
