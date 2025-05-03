import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method !== "POST") return errorResponse("POST required", 405);
  const event = await req.json();
  const supabase = getServiceClient();
  // Log event
  await supabase.from("webhook_events").insert({
    provider: "printful",
    event_type: event.type || event.event || "unknown",
    payload: event,
    received_at: new Date().toISOString(),
  });
  // Update order status if relevant
  if (event && event.data && event.data.id && event.data.status) {
    await supabase.from("printful_orders").update({ status: event.data.status })
      .eq("id", event.data.id);
  }
  return jsonResponse({ success: true });
});
