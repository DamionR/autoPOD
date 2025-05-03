/**
 * Printify API client for frontend. Calls Supabase edge functions.
 */
const BASE = "/"; // All edge functions are deployed at root

async function apiFetch(path, opts = {}) {
  const res = await fetch(BASE + path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Printify API error");
  return data;
}

/** Get Printify blueprints (product catalog) */
export function getBlueprints() {
  return apiFetch("printify-get-blueprints");
}

/** Get a Printify product by shopId and productId */
export function getProduct(shopId, productId) {
  return apiFetch(
    `printify-get-product?shopId=${encodeURIComponent(
      shopId
    )}&productId=${encodeURIComponent(productId)}`
  );
}

/** Get all Printify products for a shop */
export function getProducts(shopId) {
  return apiFetch(
    `printify-sync-products?shopId=${encodeURIComponent(shopId)}`
  );
}

/** Create a Printify product in a shop */
export function createProduct(shopId, payload) {
  return apiFetch("printify-create-product", {
    method: "POST",
    body: JSON.stringify({ shopId, payload }),
  });
}
