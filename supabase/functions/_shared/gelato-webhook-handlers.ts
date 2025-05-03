// gelato-webhook-handlers.ts - Handles all Gelato webhook events for Supabase
import {
  GelatoCatalogProductStockAvailabilityUpdated,
  GelatoOrderDeliveryEstimateUpdated,
  GelatoOrderItemStatusUpdated,
  GelatoOrderItemTrackingCodeUpdated,
  GelatoOrderStatusUpdated,
  GelatoStoreProductCreated,
  GelatoStoreProductDeleted,
  GelatoStoreProductTemplateCreated,
  GelatoStoreProductTemplateDeleted,
  GelatoStoreProductTemplateUpdated,
  GelatoStoreProductUpdated,
  GelatoWebhookEvent,
} from "./types.ts";

// Accepts a Supabase client (service role)
type SupabaseClient = ReturnType<
  typeof import("./supabase.ts").getServiceClient
>;

// --- Store Product Handlers ---
async function handleStoreProductCreated(
  event: GelatoStoreProductCreated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_products").upsert(event, {
    onConflict: "storeProductId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleStoreProductUpdated(
  event: GelatoStoreProductUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_products").upsert(event, {
    onConflict: "storeProductId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleStoreProductDeleted(
  event: GelatoStoreProductDeleted,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_products").delete().eq(
    "storeProductId",
    event.storeProductId,
  );
  if (error) throw new Error(`Supabase delete error: ${error.message}`);
  return { success: true };
}
// --- Store Product Template Handlers ---
async function handleStoreProductTemplateCreated(
  event: GelatoStoreProductTemplateCreated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_templates").upsert(event, {
    onConflict: "storeProductTemplateId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleStoreProductTemplateUpdated(
  event: GelatoStoreProductTemplateUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_templates").upsert(event, {
    onConflict: "storeProductTemplateId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleStoreProductTemplateDeleted(
  event: GelatoStoreProductTemplateDeleted,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_templates").delete().eq(
    "storeProductTemplateId",
    event.storeProductTemplateId,
  );
  if (error) throw new Error(`Supabase delete error: ${error.message}`);
  return { success: true };
}
// --- Order/Event Handlers ---
async function handleOrderStatusUpdated(
  event: GelatoOrderStatusUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_orders").upsert(event, {
    onConflict: "orderId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleOrderItemStatusUpdated(
  event: GelatoOrderItemStatusUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_order_items").upsert(event, {
    onConflict: "itemReferenceId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleOrderItemTrackingCodeUpdated(
  event: GelatoOrderItemTrackingCodeUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_order_tracking").upsert(event, {
    onConflict: "itemReferenceId",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleOrderDeliveryEstimateUpdated(
  event: GelatoOrderDeliveryEstimateUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_order_delivery_estimates")
    .upsert(event, { onConflict: "orderId" });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}
async function handleCatalogProductStockAvailabilityUpdated(
  event: GelatoCatalogProductStockAvailabilityUpdated,
  supabase: SupabaseClient,
) {
  const { error } = await supabase.from("gelato_product_stock").upsert(event, {
    onConflict: "id",
  });
  if (error) throw new Error(`Supabase upsert error: ${error.message}`);
  return { success: true };
}

// --- Main Router ---
export function handleGelatoWebhookEvent(
  event: GelatoWebhookEvent,
  supabase: SupabaseClient,
) {
  if (!("event" in event) || typeof event.event !== "string") {
    throw new Error("Invalid Gelato webhook event payload: missing event type");
  }
  switch (event.event) {
    case "store_product_created":
      return handleStoreProductCreated(event, supabase);
    case "store_product_updated":
      return handleStoreProductUpdated(event, supabase);
    case "store_product_deleted":
      return handleStoreProductDeleted(event, supabase);
    case "store_product_template_created":
      return handleStoreProductTemplateCreated(event, supabase);
    case "store_product_template_updated":
      return handleStoreProductTemplateUpdated(event, supabase);
    case "store_product_template_deleted":
      return handleStoreProductTemplateDeleted(event, supabase);
    case "order_status_updated":
      return handleOrderStatusUpdated(event, supabase);
    case "order_item_status_updated":
      return handleOrderItemStatusUpdated(event, supabase);
    case "order_item_tracking_code_updated":
      return handleOrderItemTrackingCodeUpdated(event, supabase);
    case "order_delivery_estimate_updated":
      return handleOrderDeliveryEstimateUpdated(event, supabase);
    case "catalog_product_stock_availability_updated":
      return handleCatalogProductStockAvailabilityUpdated(event, supabase);
    default:
      throw new Error(
        `Unhandled Gelato webhook event: ${
          String((event as { event?: string }).event)
        }`,
      );
  }
}
