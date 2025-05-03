// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  try {
    if (!OPENROUTER_API_KEY) {
      return errorResponse("Missing OpenRouter API key", 500);
    }
    const { prompt, model } = await req.json();
    if (!prompt || !model) return errorResponse("Missing prompt or model", 400);
    const res = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) {
      const error = await res.text();
      return errorResponse(
        `OpenRouter error: ${res.status} ${error}`,
        res.status,
      );
    }
    const data = await res.json();
    return jsonResponse({ content: data.choices?.[0]?.message?.content || "" });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ai-generate-content' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
