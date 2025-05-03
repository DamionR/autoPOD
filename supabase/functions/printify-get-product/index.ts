/**
 * GET/POST /printify-get-product
 * Fetch a Printify product by ID, upsert into Supabase, and return it.
 * Requires PRINTIFY_API_TOKEN in env.
 */
import { getProduct } from "../_shared/printify.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    let shopId: string | undefined;
    let productId: string | undefined;
    if (req.method === "POST") {
      ({ shopId, productId } = await req.json());
    } else {
      const params = new URL(req.url).searchParams;
      shopId = params.get("shopId") || undefined;
      productId = params.get("productId") || undefined;
    }
    if (!shopId || !productId) {
      return errorResponse("Missing shopId or productId", 400);
    }
    const printifyProduct = await getProduct(shopId, productId);
    const supabase = getServiceClient();
    // Upsert product into Supabase (assume table: printify_products)
    const { error } = await supabase.from("printify_products").upsert(
      printifyProduct,
      { onConflict: "id" },
    );
    if (error) {
      return errorResponse(`Supabase upsert error: ${error.message}`, 500);
    }
    return jsonResponse({ success: true, product: printifyProduct });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
