/**
 * Printful API client for frontend. Calls Supabase edge functions.
 */
const BASE = "/"; // All edge functions are deployed at root

async function apiFetch(path, opts = {}) {
  const res = await fetch(BASE + path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Printful API error");
  return data;
}

/** Get all Printful products for a store */
export function getProducts(storeId) {
  return apiFetch(
    `printful-get-products?storeId=${encodeURIComponent(storeId)}`
  );
}

/** Get a Printful product by storeId and productId */
export function getProduct(storeId, productId) {
  return apiFetch(
    `printful-get-product?storeId=${encodeURIComponent(
      storeId
    )}&productId=${encodeURIComponent(productId)}`
  );
}

/** Create a Printful product in a store */
export function createProduct(storeId, payload) {
  return apiFetch("printful-create-product", {
    method: "POST",
    body: JSON.stringify({ storeId, payload }),
  });
}
