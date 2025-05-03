// gelato.ts - Shared Gelato API integration logic for Supabase Edge Functions
// All API keys/secrets must be loaded from environment variables

import {
  CreateProductPayload,
  GelatoProduct,
  GelatoProductResponse,
  GelatoTemplate,
} from "./types.ts";

const GELATO_API_BASE = Deno.env.get("GELATO_API_BASE") ||
  "https://order.gelatoapis.com";

const GELATO_API_KEY = Deno.env.get("GELATO_API_KEY");

if (!GELATO_API_KEY) {
  throw new Error("GELATO_API_KEY environment variable is required");
}

export async function gelatoFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${GELATO_API_BASE}${path}`;
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": GELATO_API_KEY as string,
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Gelato API error: ${res.status} ${error}`);
  }
  return res.json();
}

export function getTemplates(): Promise<GelatoTemplate[]> {
  return gelatoFetch("/v3/templates", { method: "GET" });
}

export function getTemplateById(templateId: string): Promise<GelatoTemplate> {
  return gelatoFetch(`/v3/templates/${templateId}`, { method: "GET" });
}

export function createProductFromTemplate(
  payload: CreateProductPayload,
): Promise<GelatoProductResponse> {
  return gelatoFetch("/v3/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProduct(productId: string): Promise<GelatoProduct> {
  return gelatoFetch(`/v3/products/${productId}`, { method: "GET" });
}

export function getProducts(): Promise<GelatoProduct[]> {
  return gelatoFetch("/v3/products", { method: "GET" });
}

/**
 * Create a Gelato order via API.
 * @param {object} payload - Order payload as per Gelato API
 * @returns {Promise<any>} - Gelato order response
 */
export function createOrder(payload: object): Promise<any> {
  return gelatoFetch("/v4/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
