import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { getOrders } from "../_shared/printful.ts";

Deno.serve(async () => {
  const supabase = getServiceClient();
  const { data: shops, error: shopErr } = await supabase.from("printful_shops")
    .select("id");
  if (shopErr) {
    return new Response(`Error fetching shops: ${shopErr.message}`, {
      status: 500,
    });
  }
  let total = 0, errors = [];
  for (const shop of shops || []) {
    try {
      const orders = await getOrders(shop.id);
      const { error } = await supabase.from("printful_orders").upsert(orders, {
        onConflict: "id",
      });
      if (error) errors.push(`Shop ${shop.id}: ${error.message}`);
      else total += orders.length;
    } catch (err) {
      errors.push(
        `Shop ${shop.id}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  return new Response(JSON.stringify({ success: true, total, errors }), {
    headers: { "Content-Type": "application/json" },
  });
});
