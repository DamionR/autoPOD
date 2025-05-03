// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { handleGelatoWebhookEvent } from "../_shared/gelato-webhook-handlers.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return errorResponse("Method Not Allowed", 405);
    const event = await req.json();
    const supabase = getServiceClient();
    // Log event
    try {
      await supabase.from("webhook_events").insert({
        provider: "gelato",
        event_type: event.event || "unknown",
        payload: event,
        received_at: new Date().toISOString(),
        status: "received",
      });
    } catch (logErr) {
      // Continue even if logging fails
    }
    // Process event
    await handleGelatoWebhookEvent(event, supabase);
    return jsonResponse({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return errorResponse(message || "Failed to process Gelato webhook", 500);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/gelato-webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
