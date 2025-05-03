import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getProducts } from "../_shared/printful.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    let storeId: string | undefined;
    if (req.method === "POST") {
      ({ storeId } = await req.json());
    } else {
      const params = new URL(req.url).searchParams;
      storeId = params.get("storeId") || undefined;
    }
    if (!storeId) return errorResponse("Missing storeId", 400);
    const products = await getProducts(storeId);
    const supabase = getServiceClient();
    const { error } = await supabase.from("printful_products").upsert(
      products,
      { onConflict: "id" },
    );
    if (error) {
      return errorResponse(`Supabase upsert error: ${error.message}`, 500);
    }
    return jsonResponse({ success: true, products });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
