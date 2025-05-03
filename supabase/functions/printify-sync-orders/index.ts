/**
 * GET/POST /printify-sync-orders
 * Sync all Printify orders for a shop into Supabase (printify_orders table).
 * Requires PRINTIFY_API_TOKEN in env.
 */
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";
// TODO: Implement getOrders for Printify API

Deno.serve(async (req) => {
  try {
    let shopId: string | undefined;
    if (req.method === "POST") {
      ({ shopId } = await req.json());
    } else {
      const url = new URL(req.url);
      shopId = url.searchParams.get("shopId") || undefined;
    }
    if (!shopId) return errorResponse("Missing shopId", 400);
    // TODO: Fetch orders from Printify API
    // const orders = await getOrders(shopId);
    // for (const order of orders) { await supabase.from("printify_orders").upsert(order); }
    // return jsonResponse({ count: orders.length });
    return jsonResponse({ message: "Not yet implemented" });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return errorResponse(message || "Failed to sync Printify orders", 500);
  }
});
