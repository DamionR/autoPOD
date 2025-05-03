/**
 * GET /printify-get-blueprints
 * Returns a list of Printify blueprints (product catalog).
 * Requires PRINTIFY_API_TOKEN in env.
 */
import { getBlueprints } from "../_shared/printify.ts";

Deno.serve(async (_req: Request) => {
  try {
    const blueprints = await getBlueprints();
    return new Response(JSON.stringify({ blueprints }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return new Response(
      JSON.stringify({
        error: message || "Failed to fetch Printify blueprints",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
