// google-sheets.ts - Shared Google Sheets API integration logic for Supabase Edge Functions
// All API keys/secrets must be loaded from environment variables

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const GOOGLE_REDIRECT_URI = Deno.env.get("GOOGLE_REDIRECT_URI");

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error("Google Sheets API env vars required");
}

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

export async function getAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID as string,
    redirect_uri: GOOGLE_REDIRECT_URI as string,
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file",
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string) {
  const params = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID as string,
    client_secret: GOOGLE_CLIENT_SECRET as string,
    redirect_uri: GOOGLE_REDIRECT_URI as string,
    grant_type: "authorization_code",
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function refreshAccessToken(refreshToken: string) {
  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: GOOGLE_CLIENT_ID as string,
    client_secret: GOOGLE_CLIENT_SECRET as string,
    grant_type: "refresh_token",
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function readSheet(
  accessToken: string,
  spreadsheetId: string,
  range: string,
) {
  const res = await fetch(
    `${SHEETS_API_BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function writeSheet(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: string[][],
) {
  const res = await fetch(
    `${SHEETS_API_BASE}/${spreadsheetId}/values/${
      encodeURIComponent(range)
    }?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    },
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
