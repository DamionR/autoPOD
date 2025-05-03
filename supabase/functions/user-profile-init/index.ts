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
    const { user } = await req.json();
    if (!user || !user.id) return errorResponse("Missing user or user.id", 400);
    const supabase = getServiceClient();
    // Insert user profile (assume table: profiles)
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
    });
    if (error) {
      return errorResponse(`Supabase insert error: ${error.message}`, 500);
    }
    return jsonResponse({ success: true });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/user-profile-init' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
