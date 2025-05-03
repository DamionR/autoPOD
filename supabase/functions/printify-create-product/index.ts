/**
 * POST /printify-create-product
 * Create a Printify product in a shop, upsert into Supabase, and return it.
 * Requires PRINTIFY_API_TOKEN in env.
 */
import { createProduct } from "../_shared/printify.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return errorResponse("Method Not Allowed", 405);
    const { shopId, payload } = await req.json();
    if (!shopId || !payload) {
      return errorResponse("Missing shopId or payload", 400);
    }
    const product = await createProduct(shopId, payload);
    const supabase = getServiceClient();
    const { error } = await supabase.from("printify_products").upsert(product, {
      onConflict: "id",
    });
    if (error) {
      return errorResponse(`Supabase upsert error: ${error.message}`, 500);
    }
    return jsonResponse({ success: true, product });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
