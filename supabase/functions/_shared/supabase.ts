// supabase.ts - Shared Supabase client logic for Edge Functions
import { createClient } from "jsr:@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars are required",
  );
}

export function getServiceClient() {
  return createClient(
    SUPABASE_URL as string,
    SUPABASE_SERVICE_ROLE_KEY as string,
  );
}

export function getAnonClient() {
  if (!SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_ANON_KEY env var is required for anon client");
  }
  return createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
}

/**
 * Upload a file buffer to Supabase Storage and return the public URL
 * @param {string} path - Storage path (e.g. public/ai/userid/uuid.png)
 * @param {Uint8Array} buffer - File data
 * @param {string} contentType - MIME type
 * @returns {Promise<{ publicUrl: string }>} - Public URL of uploaded file
 */
export async function uploadToStorage(
  path: string,
  buffer: Uint8Array,
  contentType: string,
) {
  const supabase = getServiceClient();
  const { error } = await supabase.storage.from("public").upload(path, buffer, {
    contentType,
    upsert: false,
  });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);
  const { data } = supabase.storage.from("public").getPublicUrl(path);
  if (!data.publicUrl) throw new Error("Failed to get public URL");
  return { publicUrl: data.publicUrl };
}
