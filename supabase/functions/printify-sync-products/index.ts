/**
 * GET/POST /printify-sync-products
 * Sync all Printify products from a shop into Supabase (printify_products table).
 * Requires PRINTIFY_API_TOKEN in env.
 */
import { getProducts } from "../_shared/printify.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    let shopId: string | undefined;
    if (req.method === "POST") {
      ({ shopId } = await req.json());
    } else {
      const params = new URL(req.url).searchParams;
      shopId = params.get("shopId") || undefined;
    }
    if (!shopId) return errorResponse("Missing shopId", 400);
    const productsResp = await getProducts(shopId);
    const products = Array.isArray(productsResp.data)
      ? productsResp.data
      : productsResp;
    const supabase = getServiceClient();
    let upserted = 0;
    for (const product of products) {
      const { error } = await supabase.from("printify_products").upsert(
        product,
        { onConflict: "id" },
      );
      if (!error) upserted++;
    }
    return jsonResponse({ success: true, upserted, total: products.length });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
