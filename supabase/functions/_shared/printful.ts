// printful.ts - Shared Printful API integration logic for Supabase Edge Functions
// All API keys/secrets must be loaded from environment variables

const PRINTFUL_API_BASE = Deno.env.get("PRINTFUL_API_BASE") ||
  "https://api.printful.com";
const PRINTFUL_API_KEY = Deno.env.get("PRINTFUL_API_KEY");
const USER_AGENT = Deno.env.get("PRINTFUL_USER_AGENT") || "Gelato-Supabase-App";

if (!PRINTFUL_API_KEY) throw new Error("PRINTFUL_API_KEY env var required");

/**
 * Authenticated fetch utility for Printful API
 * @param {string} path - API endpoint path (e.g. /products)
 * @param {RequestInit} [options] - Fetch options
 * @returns {Promise<any>} - Parsed JSON response
 * @throws {Error} - On HTTP or API error
 */
async function printfulFetch(
  path: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  } = { method: "GET" },
) {
  const url = `${PRINTFUL_API_BASE}${path}`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${PRINTFUL_API_KEY}`,
    "User-Agent": USER_AGENT,
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Printful API error: ${res.status} ${error}`);
  }
  return res.json();
}

/**
 * Get all Printful stores (shops) for the account
 * @returns {Promise<any>} - List of shops
 */
export function getShops() {
  return printfulFetch("/stores", { method: "GET" });
}

/**
 * Get all Printful products for a store
 * @param {string} storeId - Printful store ID
 * @returns {Promise<any>} - List of products
 */
export function getProducts(storeId: string) {
  return printfulFetch(`/stores/${storeId}/products`, { method: "GET" });
}

/**
 * Get a single Printful product by ID
 * @param {string} storeId - Printful store ID
 * @param {string} productId - Printful product ID
 * @returns {Promise<any>} - Product details
 */
export function getProduct(storeId: string, productId: string) {
  return printfulFetch(`/stores/${storeId}/products/${productId}`, {
    method: "GET",
  });
}

/**
 * Create a new Printful product in a store
 * @param {string} storeId - Printful store ID
 * @param {object} payload - Product creation payload
 * @returns {Promise<any>} - Created product
 */
export function createProduct(storeId: string, payload: object) {
  return printfulFetch(`/stores/${storeId}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Create a Printful order
 * @param {string} storeId - Printful store ID
 * @param {object} payload - Order creation payload
 * @returns {Promise<any>} - Created order
 */
export function createOrder(storeId: string, payload: object) {
  return printfulFetch(`/stores/${storeId}/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Get all Printful orders for a store
 * @param {string} storeId - Printful store ID
 * @returns {Promise<any[]>} - List of orders
 */
export async function getOrders(storeId: string) {
  const res = await printfulFetch(`/stores/${storeId}/orders`, {
    method: "GET",
  });
  return Array.isArray(res.result) ? res.result : [];
}
