import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createOrder } from "../_shared/printful.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return errorResponse("POST required", 405);
    const { storeId, payload } = await req.json();
    if (!storeId || !payload) {
      return errorResponse("Missing storeId or payload", 400);
    }
    const order = await createOrder(storeId, payload);
    const supabase = getServiceClient();
    const { error } = await supabase.from("printful_orders").upsert([order], {
      onConflict: "id",
    });
    if (error) {
      return errorResponse(`Supabase upsert error: ${error.message}`, 500);
    }
    return jsonResponse({ success: true, order });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
