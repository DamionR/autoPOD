// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  try {
    const { bucket, path } = await req.json();
    if (!bucket || !path) return errorResponse("Missing bucket or path", 400);
    const supabase = getServiceClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    if (!data.publicUrl) {
      return errorResponse("Failed to generate public URL", 400);
    }
    return jsonResponse({ publicUrl: data.publicUrl });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/storage-public-url' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
