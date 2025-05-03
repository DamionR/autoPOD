import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  exchangeCodeForTokens,
  getAuthUrl,
  readSheet,
  refreshAccessToken,
  writeSheet,
} from "../_shared/google-sheets.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const supabase = getServiceClient();
    const method = req.method;
    // Authenticated user ID (from JWT)
    const authHeader = req.headers.get("authorization") || "";
    const jwt = authHeader.replace("Bearer ", "");
    const userResp = await supabase.auth.getUser(jwt);
    const user = userResp.data.user;
    if (!user) return errorResponse("Unauthorized", 401);
    const userId = user.id;

    // GET /auth-url: Return Google OAuth2 URL
    if (method === "GET" && url.pathname.endsWith("/auth-url")) {
      const state = crypto.randomUUID();
      return jsonResponse({ url: await getAuthUrl(state) });
    }

    // GET /oauth-callback: Handle OAuth2 callback
    if (method === "GET" && url.pathname.endsWith("/oauth-callback")) {
      const code = url.searchParams.get("code");
      if (!code) return errorResponse("Missing code", 400);
      const tokens = await exchangeCodeForTokens(code);
      // Get user email from ID token
      const idToken = tokens.id_token;
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const email = payload.email;
      // Store in DB (upsert)
      await supabase.from("google_sheets_integrations").upsert({
        user_id: userId,
        google_account_email: email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expiry: new Date(Date.now() + tokens.expires_in * 1000)
          .toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      return jsonResponse({ success: true });
    }

    // POST /export: Export data to Google Sheet
    if (method === "POST" && url.pathname.endsWith("/export")) {
      const { sheetId, range, values } = await req.json();
      if (!sheetId || !range || !values) {
        return errorResponse("Missing params", 400);
      }
      // Get tokens from DB
      const { data: integration } = await supabase.from(
        "google_sheets_integrations",
      ).select("*").eq("user_id", userId).maybeSingle();
      if (!integration) return errorResponse("No integration", 400);
      // Refresh token if needed
      let accessToken = integration.access_token;
      if (new Date(integration.token_expiry) < new Date()) {
        const refreshed = await refreshAccessToken(integration.refresh_token);
        accessToken = refreshed.access_token;
        await supabase.from("google_sheets_integrations").update({
          access_token: accessToken,
          token_expiry: new Date(Date.now() + refreshed.expires_in * 1000)
            .toISOString(),
          updated_at: new Date().toISOString(),
        }).eq("user_id", userId);
      }
      const result = await writeSheet(accessToken, sheetId, range, values);
      return jsonResponse({ success: true, result });
    }

    // POST /import: Import data from Google Sheet
    if (method === "POST" && url.pathname.endsWith("/import")) {
      const { sheetId, range } = await req.json();
      if (!sheetId || !range) return errorResponse("Missing params", 400);
      // Get tokens from DB
      const { data: integration } = await supabase.from(
        "google_sheets_integrations",
      ).select("*").eq("user_id", userId).maybeSingle();
      if (!integration) return errorResponse("No integration", 400);
      // Refresh token if needed
      let accessToken = integration.access_token;
      if (new Date(integration.token_expiry) < new Date()) {
        const refreshed = await refreshAccessToken(integration.refresh_token);
        accessToken = refreshed.access_token;
        await supabase.from("google_sheets_integrations").update({
          access_token: accessToken,
          token_expiry: new Date(Date.now() + refreshed.expires_in * 1000)
            .toISOString(),
          updated_at: new Date().toISOString(),
        }).eq("user_id", userId);
      }
      const result = await readSheet(accessToken, sheetId, range);
      return jsonResponse({ success: true, result });
    }

    return errorResponse("Not found", 404);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : String(err), 500);
  }
});
 