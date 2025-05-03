/**
 * POST /printify-create-order
 * Create a Printify order, upsert into Supabase, and return the order.
 * Requires PRINTIFY_API_TOKEN in env.
 */
import { createOrder } from "../_shared/printify.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return errorResponse("Method Not Allowed", 405);
    const { userId, shopId, productId, payload } = await req.json();
    if (!userId || !shopId || !productId || !payload) {
      return errorResponse("Missing required fields", 400);
    }
    const order = await createOrder(shopId, payload);
    const supabase = getServiceClient();
    // Upsert order
    await supabase.from("printify_orders").upsert({
      id: order.id,
      user_id: userId,
      shop_id: shopId,
      product_id: productId,
      status: order.status,
      tracking_code: order.tracking_number,
      tracking_url: order.tracking_url,
      shipping_address: order.shipping_address,
      total_amount: order.total_price,
      currency: order.currency,
      raw: order,
      updated_at: new Date().toISOString(),
    });
    // Upsert items
    if (order.line_items) {
      for (const item of order.line_items) {
        await supabase.from("printify_order_items").upsert({
          order_id: order.id,
          item_reference_id: item.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          status: item.status,
          tracking_code: item.tracking_number,
          tracking_url: item.tracking_url,
          raw: item,
          updated_at: new Date().toISOString(),
        });
      }
    }
    return jsonResponse(order);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return errorResponse(message || "Failed to create Printify order", 500);
  }
});
