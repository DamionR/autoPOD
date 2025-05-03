/**
 * POST /printify-webhook
 * Handles Printify webhook events (order/product status updates).
 * Upserts relevant data into Supabase.
 * TODO: Add signature validation if Printify supports it.
 */
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return errorResponse("Method Not Allowed", 405);
    const event = await req.json();
    const supabase = getServiceClient();
    // Log event
    try {
      await supabase.from("webhook_events").insert({
        provider: "printify",
        event_type: event.event || event.type || "unknown",
        payload: event,
        received_at: new Date().toISOString(),
        status: "received",
      });
    } catch (logErr) {
      // Continue even if logging fails
    }
    let result;
    if (event.event && event.data) {
      if (event.event.startsWith("order:")) {
        // Upsert order event (assume table: printify_orders)
        result = await supabase.from("printify_orders").upsert(event.data, {
          onConflict: "id",
        });
      } else if (event.event.startsWith("product:")) {
        // Upsert product event (assume table: printify_products)
        result = await supabase.from("printify_products").upsert(event.data, {
          onConflict: "id",
        });
      }
    }
    if (result && result.error) {
      return errorResponse(
        `Supabase upsert error: ${result.error.message}`,
        500,
      );
    }
    return jsonResponse({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return errorResponse(message || "Failed to process Printify webhook", 500);
  }
});
