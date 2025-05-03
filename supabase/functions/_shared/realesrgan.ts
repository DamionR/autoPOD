// realesrgan.ts - Shared Real-ESRGAN API integration logic for Supabase Edge Functions
// All API keys/secrets must be loaded from environment variables

import { uploadToStorage } from "./supabase.ts";

const REALESRGAN_API_URL = Deno.env.get("REALESRGAN_API_URL");
const REALESRGAN_API_KEY = Deno.env.get("REALESRGAN_API_KEY");

if (!REALESRGAN_API_URL || !REALESRGAN_API_KEY) {
  throw new Error("Missing Real-ESRGAN API config");
}

/**
 * Options for Real-ESRGAN upscaling
 */
export interface RealESRGANOptions {
  scale?: number;
  model?: string;
  [key: string]: unknown; // Allow for future extensibility, but not 'any'
}

/**
 * Upscale an image using Real-ESRGAN
 * @param {string} inputUrl - The input image URL
 * @param {string} userId - The user ID
 * @param {object} [options] - Additional options (scale, model, etc)
 * @returns {Promise<{url: string, metadata: any}>}
 */
export async function upscaleImage(
  inputUrl: string,
  userId: string,
  options: RealESRGANOptions = {},
) {
  const res = await fetch(`${REALESRGAN_API_URL}/upscale`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${REALESRGAN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input_url: inputUrl, ...options }),
  });
  if (!res.ok) throw new Error(`Real-ESRGAN API error: ${await res.text()}`);
  const data = await res.json();
  if (!data.upscaled_url) {
    throw new Error("No upscaled_url in Real-ESRGAN response");
  }
  // Download upscaled image and upload to Supabase Storage
  const imageRes = await fetch(data.upscaled_url);
  if (!imageRes.ok) throw new Error("Failed to fetch upscaled image");
  const buffer = new Uint8Array(await imageRes.arrayBuffer());
  const storagePath = `public/upsampled/${userId}/${crypto.randomUUID()}.png`;
  const { publicUrl } = await uploadToStorage(storagePath, buffer, "image/png");
  return { url: publicUrl, metadata: data };
}
