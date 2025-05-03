// printify.ts - Shared Printify API integration logic for Supabase Edge Functions
// All API keys/secrets must be loaded from environment variables

const PRINTIFY_API_BASE = Deno.env.get("PRINTIFY_API_BASE") ||
  "https://api.printify.com/v1";
const PRINTIFY_API_TOKEN = Deno.env.get("PRINTIFY_API_TOKEN");
const USER_AGENT = Deno.env.get("PRINTIFY_USER_AGENT") || "Gelato-Supabase-App";

if (!PRINTIFY_API_TOKEN) throw new Error("PRINTIFY_API_TOKEN env var required");

async function printifyFetch(
  path: string,
  options: { method: string; headers?: Record<string, string>; body?: string } =
    { method: "GET" },
) {
  const url = `${PRINTIFY_API_BASE}${path}`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${PRINTIFY_API_TOKEN}`,
    "User-Agent": USER_AGENT,
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Printify API error: ${res.status} ${error}`);
  }
  return res.json();
}

export function getShops() {
  return printifyFetch("/shops.json", { method: "GET" });
}
export function getBlueprints() {
  return printifyFetch("/catalog/blueprints.json", { method: "GET" });
}
export function getBlueprint(blueprintId: string | number) {
  return printifyFetch(`/catalog/blueprints/${blueprintId}.json`, {
    method: "GET",
  });
}
export function getPrintProviders(blueprintId: string | number) {
  return printifyFetch(
    `/catalog/blueprints/${blueprintId}/print_providers.json`,
    { method: "GET" },
  );
}
export function getVariants(
  blueprintId: string | number,
  printProviderId: string | number,
) {
  return printifyFetch(
    `/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`,
    { method: "GET" },
  );
}
export function getProducts(shopId: string | number) {
  return printifyFetch(`/shops/${shopId}/products.json`, { method: "GET" });
}
export function getProduct(
  shopId: string | number,
  productId: string | number,
) {
  return printifyFetch(`/shops/${shopId}/products/${productId}.json`, {
    method: "GET",
  });
}
export function createProduct(shopId: string | number, payload: object) {
  return printifyFetch(`/shops/${shopId}/products.json`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export function uploadImageByUrl(fileName: string, url: string) {
  return printifyFetch("/uploads/images.json", {
    method: "POST",
    body: JSON.stringify({ file_name: fileName, url }),
  });
}

export interface PrintifyOrderResponse {
  id: string;
  status: string;
  // ...other fields as per Printify API docs
}

/**
 * Create a Printify order via API.
 * @param {string|number} shopId - Printify shop ID
 * @param {object} payload - Order payload as per Printify API
 * @returns {Promise<PrintifyOrderResponse>} - Printify order response
 */
export function createOrder(
  shopId: string | number,
  payload: object,
): Promise<PrintifyOrderResponse> {
  return printifyFetch(`/shops/${shopId}/orders.json`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
