import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getProduct } from "../_shared/printful.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    let storeId: string | undefined, productId: string | undefined;
    if (req.method === "POST") {
      ({ storeId, productId } = await req.json());
    } else {
      const params = new URL(req.url).searchParams;
      storeId = params.get("storeId") || undefined;
      productId = params.get("productId") || undefined;
    }
    if (!storeId || !productId) {
      return errorResponse("Missing storeId or productId", 400);
    }
    const product = await getProduct(storeId, productId);
    const supabase = getServiceClient();
    const { error } = await supabase.from("printful_products").upsert(
      [product],
      { onConflict: "id" },
    );
    if (error) {
      return errorResponse(`Supabase upsert error: ${error.message}`, 500);
    }
    return jsonResponse({ success: true, product });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
