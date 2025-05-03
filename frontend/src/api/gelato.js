const API_BASE = process.env.REACT_APP_SUPABASE_URL + "/functions/v1";

async function callFunction(name, body) {
  const res = await fetch(`${API_BASE}/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function fetchProducts() {
  return callFunction("gelato-get-product", {});
}

export function fetchProductDetail(productId) {
  return callFunction("gelato-get-product", { productId });
}

export function fetchTemplates() {
  return callFunction("gelato-sync-templates", {});
}

export function fetchTemplateDetail(templateId) {
  return callFunction("gelato-sync-templates", { templateId });
}

export function createProduct(payload) {
  return callFunction("gelato-create-product", payload);
}

export function generateAIContent(payload) {
  return callFunction("ai-generate-content", payload);
}
