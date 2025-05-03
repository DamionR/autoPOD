const API_BASE =
  process.env.REACT_APP_SUPABASE_URL +
  "/functions/v1/google-sheets-integration";

async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("sb-access-token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Google Sheets API error");
  return data;
}

export function getAuthUrl() {
  return apiFetch("/auth-url", { method: "GET" });
}

export function handleOAuthCallback(code) {
  const url = `/oauth-callback?code=${encodeURIComponent(code)}`;
  return apiFetch(url, { method: "GET" });
}

export function exportToSheet(sheetId, range, values) {
  return apiFetch("/export", {
    method: "POST",
    body: JSON.stringify({ sheetId, range, values }),
  });
}

export function importFromSheet(sheetId, range) {
  return apiFetch("/import", {
    method: "POST",
    body: JSON.stringify({ sheetId, range }),
  });
}
