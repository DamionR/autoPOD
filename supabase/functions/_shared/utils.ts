/// <reference lib="deno.ns" />
// utils.ts - Shared utility functions for Edge Functions
// Note: This file is for Supabase Edge Functions. The Deno global is available in this environment.
// (Deno global is available in Supabase Edge Functions; linter error can be ignored.)

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorResponse(message: string, status = 500): Response {
  return jsonResponse({ error: message }, status);
}

export function getEnvOrThrow(key: string): string {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}
