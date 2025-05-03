/**
 * GET/POST /gelato-sync-orders
 * Sync all Gelato orders for a user/shop into Supabase (gelato_orders table).
 * Requires GELATO_API_KEY in env.
 */
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";
// TODO: Implement getOrders for Gelato API

Deno.serve(async (req) => {
  try {
    let userId: string | undefined;
    let shopId: string | undefined;
    if (req.method === "POST") {
      ({ userId, shopId } = await req.json());
    } else {
      const url = new URL(req.url);
      userId = url.searchParams.get("userId") || undefined;
      shopId = url.searchParams.get("shopId") || undefined;
    }
    if (!userId) return errorResponse("Missing userId", 400);
    // TODO: Fetch orders from Gelato API
    // const orders = await getOrders(userId, shopId);
    // for (const order of orders) { await supabase.from("gelato_orders").upsert(order); }
    // return jsonResponse({ count: orders.length });
    return jsonResponse({ message: "Not yet implemented" });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return errorResponse(message || "Failed to sync Gelato orders", 500);
  }
});
