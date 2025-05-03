/**
 * POST /gelato-create-order
 * Create a Gelato order, upsert into Supabase, and return the order.
 * Requires GELATO_API_KEY in env.
 */
import { createOrder } from "../_shared/gelato.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return errorResponse("Method Not Allowed", 405);
    const { userId, productId, payload } = await req.json();
    if (!userId || !productId || !payload) {
      return errorResponse("Missing required fields", 400);
    }
    const order = await createOrder(payload);
    const supabase = getServiceClient();
    // Upsert order
    await supabase.from("gelato_orders").upsert({
      id: order.id,
      user_id: userId,
      product_id: productId,
      status: order.status,
      tracking_code: order.tracking_code,
      tracking_url: order.tracking_url,
      shipping_address: order.shipping_address,
      total_amount: order.total_amount,
      currency: order.currency,
      raw: order,
      updated_at: new Date().toISOString(),
    });
    // Upsert items
    if (order.items) {
      for (const item of order.items) {
        await supabase.from("gelato_order_items").upsert({
          order_id: order.id,
          item_reference_id: item.itemReferenceId,
          product_id: item.productId,
          variant_id: item.variantId,
          quantity: item.quantity,
          status: item.status,
          tracking_code: item.tracking_code,
          tracking_url: item.tracking_url,
          raw: item,
          updated_at: new Date().toISOString(),
        });
      }
    }
    return jsonResponse(order);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return errorResponse(message || "Failed to create Gelato order", 500);
  }
});
